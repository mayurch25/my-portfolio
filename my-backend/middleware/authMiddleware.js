import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization || "";

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      return next();
    }

    return res.status(401).json({ message: "No token provided" });

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};