import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Kullanıcı bulunamadı" });
      }

      next();
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

  if (!token) {
    res.status(401).json({ message: "Yetkisiz erişim: access token yok." });
  }
};
