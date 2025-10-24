const express = require('express');
const User = require("../models/User");
const Note = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
var isAdmin = require('../middleware/isAdmin');

const jwtSecret = process.env.JWT_SECRET;

//ROUTE 1: Create a User using: POST "/api/auth/createuser"
router.post(
  '/createuser',
  [
    body('name', 'Please enter a name at least 3 characters').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const SecretPassword = bcrypt.hashSync(req.body.password, salt);

      // const count = await User.countDocuments();
      const lastUser = await User.findOne().sort({ userNumber: -1 });  // last user
      let nextUserNumber = lastUser ? lastUser.userNumber + 1 : 1;

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecretPassword,
        userNumber: nextUserNumber,
      });

      const data = {
        user: {
          id: user.id,
        }
      }

      await user.save();

      const authToken = jwt.sign(data, jwtSecret);
      success = true;
      res.json({ success, msg: "User created successfully", authToken, userTag: `User ${user.userNumber}` });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE 2: Login a User using: POST "/api/auth/login" no login required
router.post(
  '/login',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Please try to login with correct credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please try to login with correct Password!" });
      }

      const data = {
        user: {
          id: user.id,
          role: user.role
        }
      }

      const authToken = jwt.sign(data, jwtSecret);
      if (user.role === "admin") {
        res.json({ msg: "Admin login successfully", authToken });
      } else {
        res.json({ msg: "User login successfully", authToken, userTag: `User ${user.userNumber}` });
      }

    } catch (err) {
      console.error(err.message);
      res.status(400).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Users details of login User using: POST "/api/auth/getuser" Login required
router.post(
  '/getuser', fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      if (!user) {
        return res.status(404).json({ msg: "User does not exist!" });
      }
      if (user.role === "admin") {
        res.json({ msg: "Logged in Admin details:", user })
      } else {
        res.json({ msg: "Logged in User details:", user });
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Internal Server Error");
    }
  }
);


//ROUTE 4: UPDATE USER: PUT "/api/auth/updateuser". Login required
router.put("/updateuser", fetchuser, async (req, res) => {
  try {
    const { name, email, currentPassword, password, confirmPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // new user object
    const newUser = {};
    if (name) newUser.name = name;
    if (email) newUser.email = email;

    if (currentPassword || password || confirmPassword) {
      if (!currentPassword || !password || !confirmPassword) {
        return res.status(400).json({ msg: "All password fields are required" });
      }

      // Current password check
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Your current password is incorrect!" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ msg: "New password and Confirm password do not match" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
    }

    // find user by id and update
    let updateduser = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true }).select("-password"); // password hide

    res.json({ msg: "User updated successfully", user: updateduser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

// Route 5: Delete a user account using: DELETE "/api/auth/deleteuser". Login required
router.delete("/deleteuser", fetchuser, async (req, res) => {
  try {
    // login user ko find karo
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, msg: "Account not found!" });
    }

    // related notes bhi delete karo
    await Note.deleteMany({ user: req.user.id });

    // user delete karo
    await User.findByIdAndDelete(req.user.id);

    res.json({ success: true, msg: "Your account and all notes have been deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});


//ROUTE 6: FETCH ALL USERS: GET "/api/auth/fetchallusers" (admin required)
router.get("/fetchallusers", fetchuser, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found!" });
    }

    res.json({ msg: "All registered users:", count: users.length, users });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;