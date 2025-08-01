import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// Access Token üretici
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Refresh Token üretici
export const generateRefreshToken = () => {
  return jwt.sign({ type: "refresh" }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

// Token'ları cookie'ye yaz
export const sendTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 60 * 1000, // 1 saat
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
  });
};

// 6 haneli doğrulama kodu üretici
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Şifre validasyon fonksiyonu - dosyanın başına ekle
const validatePassword = (password) => {
  if (password.length < 8) {
    return "Şifre en az 8 karakter olmalı";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir";
  }

  return null;
};

// KAYIT OL
export const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 dakika

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

    try {
      await sendEmail({
        to: email,
        subject: "E-posta Doğrulama Kodu - MERN Auth",
        text: `Merhaba ${name},\n\nHesabınızı doğrulamak için aşağıdaki 6 haneli kodu kullanın:\n\n${verificationCode}\n\nBu kod 10 dakika geçerlidir.\n\nTeşekkürler!`,
      });
    } catch (emailError) {
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        message: "E-posta gönderilirken hata oluştu. Lütfen tekrar deneyin.",
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

// GİRİŞ YAP
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "E-posta adresinizi doğrulamanız gerekiyor. Lütfen e-posta kutunuzu kontrol edin.",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    if (user.refreshTokens.length >= 3) {
      user.refreshTokens = user.refreshTokens.slice(-2); // Son 4 tanesini tut
    }

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    user.lastLogin = new Date();
    await user.save();

    sendTokenCookies(res, accessToken, refreshToken);

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

// DOĞRULAMA KODU DOĞRULA
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

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    if (user.refreshTokens.length >= 3) {
      user.refreshTokens = user.refreshTokens.slice(-2);
    }

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

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

// DOĞRULAMA KODU YENİDEN GÖNDER
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

    const verificationCode = generateVerificationCode();
    const verificationCodeExpire = Date.now() + 10 * 60 * 1000;

    user.verificationCode = verificationCode;
    user.verificationCodeExpire = verificationCodeExpire;
    await user.save();

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

// ŞİFREMİ UNUTTUM - KOD GÖNDER
export const forgotPasswordWithCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "E-posta adresi gerekli" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı",
      });
    }

    const resetCode = generateVerificationCode();
    const resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 dakika

    user.resetCode = resetCode;
    user.resetCodeExpire = resetCodeExpire;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Şifre Sıfırlama Kodu - MERN Auth",
      text: `Merhaba ${user.name},\n\nŞifrenizi sıfırlamak için aşağıdaki 6 haneli kodu kullanın:\n\n${resetCode}\n\nBu kod 10 dakika geçerlidir.\n\nTeşekkürler!`,
    });

    res.status(200).json({
      message: "Şifre sıfırlama kodu e-posta adresinize gönderildi",
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// YENİ ŞİFRE BELİRLE - Bu fonksiyon zaten kod doğrulaması yapıyor
export const resetPasswordWithCode = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        message: "E-posta, kod ve yeni şifre gerekli",
      });
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const user = await User.findOne({
      email,
      resetCode: code,
      resetCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Geçersiz veya süresi dolmuş doğrulama kodu",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;

    user.refreshTokens = [];

    await user.save();

    res.status(200).json({
      message:
        "Şifre başarıyla değiştirildi. Yeni şifrenizle giriş yapabilirsiniz",
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// ÇIKIŞ YAP
export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await User.updateOne(
        { "refreshTokens.token": refreshToken },
        { $pull: { refreshTokens: { token: refreshToken } } }
      );
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Çıkış başarılı" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// TOKEN YENİLE - Token Rotation ile güncellenmiş
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token bulunamadı" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findOne({
      "refreshTokens.token": refreshToken,
    });

    if (!user) {
      return res.status(401).json({ message: "Geçersiz refresh token" });
    }

    user.refreshTokens = user.refreshTokens.filter(
      (tokenObj) => tokenObj.token !== refreshToken
    );

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();

    user.refreshTokens.push({ token: newRefreshToken });

    if (user.refreshTokens.length > 3) {
      user.refreshTokens = user.refreshTokens.slice(-3);
    }

    await user.save();

    sendTokenCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({
      message: "Token yenilendi",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Geçersiz refresh token", error: err.message });
  }
};

// SÜRESİ DOLMUŞ TOKEN'LARI TEMİZLE
export const cleanupExpiredTokens = async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const result = await User.updateMany(
      {},
      {
        $pull: {
          refreshTokens: {
            createdAt: { $lt: thirtyDaysAgo },
          },
        },
      }
    );

    console.log(
      `Temizlenen süresi dolmuş token sayısı: ${result.modifiedCount}`
    );
    return result;
  } catch (err) {
    console.error("Token temizleme hatası:", err.message);
    throw err;
  }
};

// MANUEL TOKEN TEMİZLEME ENDPOİNTİ (Admin için)
export const manualCleanupTokens = async (req, res) => {
  try {
    const result = await cleanupExpiredTokens();

    res.status(200).json({
      message: "Süresi dolmuş token'lar başarıyla temizlendi",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Token temizleme hatası",
      error: err.message,
    });
  }
};

// OTOMATİK TOKEN TEMİZLEME (Cron Job için)
export const scheduleTokenCleanup = () => {
  setInterval(async () => {
    try {
      await cleanupExpiredTokens();
      console.log(
        "Otomatik token temizleme tamamlandı:",
        new Date().toISOString()
      );
    } catch (err) {
      console.error("Otomatik token temizleme hatası:", err.message);
    }
  }, 24 * 60 * 60 * 1000); // 24 saat
};

// GOOGLE AUTH CALLBACK
export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    user.refreshTokens.push({ token: refreshToken });
    user.lastLogin = new Date();
    await user.save();

    sendTokenCookies(res, accessToken, refreshToken);

    const userForFrontend = user.toObject();
    delete userForFrontend.password;
    delete userForFrontend.refreshTokens;
    delete userForFrontend.__v;

    const userParam = encodeURIComponent(JSON.stringify(userForFrontend));
    const callbackUrl = `${process.env.CLIENT_URL}/auth/google/callback?user=${userParam}&token=${accessToken}`;
    res.redirect(callbackUrl);
  } catch (err) {
    const errorMessage = encodeURIComponent("Google ile giriş başarısız");
    res.redirect(
      `${process.env.CLIENT_URL}/auth/google/callback?error=${errorMessage}`
    );
  }
};
