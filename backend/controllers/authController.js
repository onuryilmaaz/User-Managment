import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
// Activity logging import'u ekle
import { logActivity } from "./activityController.js";

// 🔐 Access Token üretici (kısa süreli)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // 1 saat (15m yerine)
  );
};

// 🔄 Refresh Token üretici (uzun süreli)
const generateRefreshToken = () => {
  return jwt.sign(
    { type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" } // 30 gün
  );
};

// 🍪 Token'ları cookie'ye yaz
const sendTokenCookies = (res, accessToken, refreshToken) => {
  // Access token - kısa süreli
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 60 * 1000, // 1 saat (15 * 60 * 1000 yerine)
  });

  // Refresh token - uzun süreli
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
  });
};

// 🔢 6 haneli doğrulama kodu üretici
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 📌 KAYIT OL: /api/auth/register (Güncellenmiş)
export const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password, username } = req.body;

    // Kullanıcı zaten var mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6 haneli doğrulama kodu oluştur
    const verificationCode = generateVerificationCode();
    const verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 dakika

    // Yeni kullanıcı oluştur (henüz token vermiyoruz)
    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      username,
      verificationCode,
      verificationCodeExpire,
    });

    await user.save();

    // Doğrulama kodunu e-posta ile gönder
    try {
      await sendEmail({
        to: email,
        subject: "E-posta Doğrulama Kodu - MERN Auth",
        text: `Merhaba ${name},\n\nHesabınızı doğrulamak için aşağıdaki 6 haneli kodu kullanın:\n\n${verificationCode}\n\nBu kod 10 dakika geçerlidir.\n\nEğer bu hesabı siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.\n\nTeşekkürler!`,
      });
    } catch (emailError) {
      console.error("E-posta gönderme hatası:", emailError);
      // Kullanıcıyı sil çünkü e-posta gönderilemedi
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        message: "E-posta gönderilirken hata oluştu. Lütfen tekrar deneyin.",
        error: emailError.message,
      });
    }

    res.status(201).json({
      message:
        "Hesap oluşturuldu! E-posta adresinize gönderilen 6 haneli doğrulama kodunu girin.",
      email: user.email,
      requiresVerification: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 DOĞRULAMA KODU DOĞRULA: /api/auth/verify-code
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "E-posta ve doğrulama kodu gerekli" });
    }

    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Geçersiz veya süresi dolmuş doğrulama kodu",
      });
    }

    // Kullanıcıyı doğrula
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;

    // Token'ları oluştur (şimdi giriş yapıyoruz)
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    // Refresh token'ı database'e kaydet
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // Activity log ekle
    await logActivity(
      user._id,
      "email_verification",
      `Kullanıcı ${user.email} e-posta doğrulamasını tamamladı`,
      req
    );

    // Token'ları cookie'ye yaz
    sendTokenCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "E-posta başarıyla doğrulandı! Giriş yapılıyor...",
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 DOĞRULAMA KODU YENİDEN GÖNDER: /api/auth/resend-code
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "E-posta adresi gerekli" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Bu hesap zaten doğrulanmış" });
    }

    // Yeni doğrulama kodu oluştur
    const verificationCode = generateVerificationCode();
    const verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 dakika

    user.verificationCode = verificationCode;
    user.verificationCodeExpire = verificationCodeExpire;
    await user.save();

    // Doğrulama kodunu e-posta ile gönder
    await sendEmail({
      to: email,
      subject: "Yeni E-posta Doğrulama Kodu - MERN Auth",
      text: `Merhaba ${user.name},\n\nYeni doğrulama kodunuz:\n\n${verificationCode}\n\nBu kod 10 dakika geçerlidir.\n\nTeşekkürler!`,
    });

    res.status(200).json({
      message: "Yeni doğrulama kodu e-posta adresinize gönderildi",
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 GİRİŞ YAP: /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul (şifre dahil tüm alanlarla)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
    }

    // E-posta doğrulaması kontrolü
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "E-posta adresinizi doğrulamanız gerekiyor. Lütfen e-posta kutunuzu kontrol edin.",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    // Token'ları oluştur
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    // Refresh token'ı database'e kaydet ve lastLogin'i güncelle
    user.refreshTokens.push({ token: refreshToken });
    user.lastLogin = new Date(); // ✅ Son giriş zamanını güncelle
    await user.save();

    // Activity log ekle
    await logActivity(
      user._id,
      "login",
      `Kullanıcı ${user.email} başarıyla giriş yaptı`,
      req
    );

    // Token'ları cookie'ye yaz
    sendTokenCookies(res, accessToken, refreshToken);

    // Frontend'e gönderilecek kullanıcı objesini hazırla
    const userForFrontend = user.toObject();
    delete userForFrontend.password;
    delete userForFrontend.refreshTokens;
    delete userForFrontend.__v;

    res.status(200).json({
      message: "Giriş başarılı",
      user: userForFrontend,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 🔄 TOKEN YENİLE: /api/auth/refresh
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token bulunamadı" });
    }

    // Refresh token'ı doğrula
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Database'de refresh token'ı bul
    const user = await User.findOne({
      "refreshTokens.token": refreshToken,
    });

    if (!user) {
      return res.status(401).json({ message: "Geçersiz refresh token" });
    }

    // Yeni access token oluştur
    const newAccessToken = generateAccessToken(user);

    // Access token'ı cookie'ye yaz
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000, // 15 dakika
    });

    res.status(200).json({
      message: "Token yenilendi",
      accessToken: newAccessToken,
    });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Geçersiz refresh token", error: err.message });
  }
};

// 📌 ÇIKIŞ YAP: /api/auth/logout
export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // Kullanıcıyı bul (activity log için)
    let userId = null;
    if (refreshToken) {
      try {
        const user = await User.findOne({
          "refreshTokens.token": refreshToken,
        });
        if (user) {
          userId = user._id;
          // Activity log ekle
          await logActivity(
            userId,
            "logout",
            `Kullanıcı ${user.email} çıkış yaptı`,
            req
          );
        }
      } catch (error) {
        console.error("Logout activity log error:", error);
      }

      // Refresh token'ı database'den kaldır
      await User.updateOne(
        { "refreshTokens.token": refreshToken },
        { $pull: { refreshTokens: { token: refreshToken } } }
      );
    }

    // Cookie'leri temizle
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Çıkış başarılı" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// ✅ Şifre sıfırlama tokenı üret
const createResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const expires = Date.now() + 1000 * 60 * 15; // 15 dakika
  return { resetToken, hashedToken, expires };
};

// 📌 1. ŞİFREYİ SIFIRLAMA: /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "E-posta adresi gerekli." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.",
      });
    }

    const { resetToken, hashedToken, expires } = createResetToken();

    // Debug için log'lar
    console.log("=== FORGOT PASSWORD DEBUG ===");
    console.log("Original token:", resetToken);
    console.log("Hashed token (DB'ye kaydedilecek):", hashedToken);
    console.log("Expires:", new Date(expires));

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = expires;
    await user.save();

    // Veritabanına kaydedildiğini doğrula
    const savedUser = await User.findById(user._id);
    console.log("DB'deki token:", savedUser.resetPasswordToken);
    console.log("DB'deki expire:", new Date(savedUser.resetPasswordExpire));

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      text: `Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:\n\n${resetUrl}\n\nBu link 15 dakika geçerlidir.`,
    });

    res.status(200).json({
      message:
        "Şifre sıfırlama e-postası gönderildi. E-posta kutunuzu kontrol edin.",
      // Development için
      debug: {
        resetToken,
        hashedToken,
        expires: new Date(expires),
      },
    });
  } catch (err) {
    console.error("Forgot password hatası:", err);
    res.status(500).json({ message: "Hata oluştu", error: err.message });
  }
};

// 📌 2. ŞİFREYİ SIFIRLA: /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  try {
    console.log("=== RESET PASSWORD DEBUG ===");
    console.log("Gelen token (URL'den):", req.params.token);

    if (!req.params.token) {
      return res.status(400).json({ message: "Reset token gerekli." });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: "Yeni şifre gerekli." });
    }

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre en az 6 karakter olmalı." });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    console.log("Hash'lenmiş token (DB'de aranacak):", hashedToken);
    console.log("Şu anki zaman:", Date.now(), "(", new Date(), ")");

    // Önce tüm reset token'ları görelim
    const allUsersWithResetToken = await User.find({
      resetPasswordToken: { $exists: true, $ne: null },
    }).select("email resetPasswordToken resetPasswordExpire");

    console.log("DB'deki tüm reset token'lar:", allUsersWithResetToken);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    console.log("Bulunan kullanıcı:", user ? "Var" : "Yok");

    if (!user) {
      // Süresi dolmuş token kontrolü
      const expiredUser = await User.findOne({
        resetPasswordToken: hashedToken,
      });

      if (expiredUser) {
        console.log("Token bulundu ama süresi dolmuş:", {
          tokenExpire: new Date(expiredUser.resetPasswordExpire),
          now: new Date(),
        });
        return res.status(400).json({
          message:
            "Reset token'ın süresi dolmuş. Lütfen yeni bir reset talebi oluşturun.",
        });
      } else {
        console.log("Token hiç bulunamadı");
        return res.status(400).json({
          message:
            "Geçersiz reset token. Lütfen yeni bir reset talebi oluşturun.",
        });
      }
    }

    const newHashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = newHashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Activity log ekle
    await logActivity(
      user._id,
      "password_reset",
      `Kullanıcı ${user.email} şifresini sıfırladı`,
      req
    );

    res.status(200).json({
      message:
        "Şifre başarıyla sıfırlandı. Artık yeni şifrenizle giriş yapabilirsiniz.",
    });
  } catch (err) {
    console.error("Reset password hatası:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 3. E-POSTA DOĞRULAMA: /api/auth/send-verify-email
export const sendVerificationEmail = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `${process.env.CLIENT_URL}/verify-email/${token}`;

    await sendEmail({
      to: user.email,
      subject: "E-Posta Doğrulama",
      text: `Hesabınızı doğrulamak için tıklayın:\n${url}`,
    });

    res.status(200).json({ message: "Doğrulama maili gönderildi." });
  } catch (err) {
    res.status(500).json({ message: "Hata oluştu", error: err.message });
  }
};

// 📌 4. TOKEN İLE E-POSTA DOĞRULA: /api/auth/verify-email/:token
export const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "E-posta başarıyla doğrulandı." });
  } catch (err) {
    res.status(400).json({ message: "Token geçersiz ya da süresi dolmuş." });
  }
};

// 📌 GOOGLE AUTH CALLBACK: /api/auth/google/callback
export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    // Refresh token'ı database'e kaydet ve lastLogin'i güncelle
    user.refreshTokens.push({ token: refreshToken });
    user.lastLogin = new Date(); // ✅ Son giriş zamanını güncelle
    await user.save();

    // Activity log ekle
    await logActivity(
      user._id,
      "login",
      `Kullanıcı ${user.email} Google ile giriş yaptı`,
      req
    );

    // Token'ları cookie'ye yaz
    sendTokenCookies(res, accessToken, refreshToken);

    // Frontend'e gönderilecek kullanıcı objesini hazırla
    const userForFrontend = user.toObject();
    delete userForFrontend.password;
    delete userForFrontend.refreshTokens;
    delete userForFrontend.__v;

    // Success sayfasına yönlendir (popup'a mesaj gönderecek)
    const userParam = encodeURIComponent(JSON.stringify(userForFrontend));
    res.redirect(`/success.html?user=${userParam}&token=${accessToken}`);
  } catch (err) {
    console.error("Google auth error:", err);
    // Error sayfasına yönlendir
    res.redirect(
      `/error.html?message=${encodeURIComponent("Google ile giriş başarısız")}`
    );
  }
};

// Export yeni token fonksiyonlarını userController için
export { generateAccessToken, generateRefreshToken, sendTokenCookies };
