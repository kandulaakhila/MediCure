import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    // Read token from Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login again",
      });
    }

    // Token format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please login again",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach doctorId safely
    req.doctor = { id: decoded.id };

    // Proceed
    next();
  } catch (error) {
    console.error("Error in doctor auth middleware:", error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
