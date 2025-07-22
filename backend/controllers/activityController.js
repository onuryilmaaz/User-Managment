import Activity from "../models/Activity.js";

// Kullanıcının aktivite geçmişini getir
export const getUserActivities = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user._id;

    const activities = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Activity.countDocuments({ userId });

    res.status(200).json({
      activities,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

// Aktivite kaydetme helper fonksiyonu
export const logActivity = async (userId, action, description, req = null) => {
  try {
    const activityData = {
      userId,
      action,
      description,
    };

    if (req) {
      activityData.ipAddress = req.ip || req.connection.remoteAddress;
      activityData.userAgent = req.get("User-Agent");
    }

    await Activity.create(activityData);
  } catch (error) {
    console.error("Aktivite kaydedilirken hata:", error);
  }
};
