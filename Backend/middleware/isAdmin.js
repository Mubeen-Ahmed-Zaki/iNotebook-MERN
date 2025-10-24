const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ msg: "User not found!" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied! Admins only" });
    }

    next(); // continue to route

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = isAdmin;