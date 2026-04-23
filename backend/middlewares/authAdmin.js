import jwt from "jsonwebtoken";


const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login again" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing. Please login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ success: false, message: "Token expired. Please login again" });
    }

    
    if (!decoded.email || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login again" });
    }

    req.admin = decoded.email;

    if (process.env.NODE_ENV === "development") {
      console.log(`Authenticated admin: ${decoded.email}`);
    }

    next();
  } catch (error) {
    console.error("Error in admin auth middleware:", error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authAdmin;

