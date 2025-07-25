import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 📌 KULLANICI BİLGİLERİNİ AL: /api/user/me
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
        bio: user.bio,
        location: user.location,
        social: user.social,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 PROFİL GÜNCELLEME: /api/user/update-profile
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;

    // Gelen isteğin body'sinden `profilePicture`'ı da alıyoruz
    const { name, surname, bio, location, social, profilePicture, phone } = req.body;

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone; // Phone alanı eklendi
    if (location) user.location = location;
    if (social) user.social = social;

    // Eğer frontend'den bir profilePicture URL'i geldiyse, onu kullanıcıya ata
    // Eğer gelmediyse, mevcut değeri koru
    if (typeof profilePicture !== "undefined") {
      user.profilePicture = profilePicture;
    }

    // Değişiklikleri veritabanına kaydet
    const updatedUser = await user.save();

    res.status(200).json({ message: "Profil güncellendi", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 KULLANICI LİSTESİ: /api/user/list (Admin ve Moderatör için)
export const getUserList = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "-password -resetPasswordToken -resetPasswordExpire -refreshTokens"
    );
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 KULLANICI SİL: /api/user/delete/:id (Admin ve Moderatör için)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Kendi kendini silmeyi engelle
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "Kendi hesabınızı silemezsiniz" });
    }

    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Moderatör admin'i silemez
    if (req.user.role === "Moderator" && userToDelete.role === "Admin") {
      return res
        .status(403)
        .json({ message: "Moderatör admin kullanıcıları silemez" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 KULLANICI AKTİF/PASİF YAPMA: /api/user/toggle-status/:id (Admin ve Moderatör için)
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Kendi durumunu değiştirmeyi engelle
    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "Kendi hesabınızın durumunu değiştiremezsiniz" });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Moderatör admin'in durumunu değiştiremez
    if (req.user.role === "Moderator" && userToUpdate.role === "Admin") {
      return res.status(403).json({
        message: "Moderatör admin kullanıcılarının durumunu değiştiremez",
      });
    }

    userToUpdate.isActive = !userToUpdate.isActive;
    await userToUpdate.save();

    res.status(200).json({
      message: `Kullanıcı ${userToUpdate.isActive ? "aktif" : "pasif"} yapıldı`,
      user: {
        id: userToUpdate._id,
        name: userToUpdate.name,
        email: userToUpdate.email,
        isActive: userToUpdate.isActive,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 KULLANICI ROLÜ DEĞİŞTİRME: /api/user/change-role/:id (Sadece Admin için)
export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Geçerli roller kontrolü
    if (!["User", "Moderator"].includes(role)) {
      return res.status(400).json({
        message: "Geçersiz rol. Sadece 'User' veya 'Moderator' olabilir",
      });
    }

    // Kendi rolünü değiştirmeyi engelle
    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "Kendi rolünüzü değiştiremezsiniz" });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Admin rolünü değiştirmeyi engelle
    if (userToUpdate.role === "Admin") {
      return res
        .status(403)
        .json({ message: "Admin kullanıcılarının rolü değiştirilemez" });
    }

    userToUpdate.role = role;
    await userToUpdate.save();

    res.status(200).json({
      message: `Kullanıcı rolü ${role} olarak güncellendi`,
      user: {
        id: userToUpdate._id,
        name: userToUpdate.name,
        email: userToUpdate.email,
        role: userToUpdate.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// 📌 ŞİFRE DEĞİŞTİR: /api/user/change-password
// Şifre validasyon fonksiyonu - dosyanın başına ekle
const validatePassword = (password) => {
  if (password.length < 8) {
    return "Şifre en az 8 karakter olmalı";
  }
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir";
  }
  
  return null;
};

// changePassword fonksiyonunu güncelle
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Mevcut şifre ve yeni şifre gerekli",
      });
    }

    // Şifre validasyonu
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Yeni şifre en az 6 karakter olmalıdır",
      });
    }

    // Kullanıcıyı bul (şifre dahil)
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Mevcut şifreyi kontrol et
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Mevcut şifre hatalı" });
    }

    // Yeni şifreyi hash'le
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Şifreyi güncelle
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Şifre başarıyla değiştirildi" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};
