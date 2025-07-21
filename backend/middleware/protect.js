import jwt from "jsonwebtoken";
import User from "../models/User.js"; // User modelinin yolu doğru olmalı

export const protect = async (req, res, next) => {
  let token;

  // 1. 'Authorization' başlığını oku ve 'Bearer' ile başlayıp başlamadığını kontrol et
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Token'ı al ("Bearer " kelimesini at)
      token = req.headers.authorization.split(" ")[1];

      // 3. Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Token'dan gelen kullanıcı ID'si ile kullanıcıyı bul ve isteğe ekle
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Kullanıcı bulunamadı" });
      }

      next(); // Her şey yolundaysa, sonraki adıma geç
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access token süresi dolmuş",
          code: "TOKEN_EXPIRED",
        });
      }
      return res
        .status(401)
        .json({ message: "Yetkisiz erişim: Token geçersiz" });
    }
  }

  // Eğer token başlıkta hiç yoksa
  if (!token) {
    res.status(401).json({ message: "Yetkisiz erişim: access token yok." });
  }
};
