const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail,
  findUserById,
  updateProfile,
} = require("../models/userModel");


// =========================
// REGISTER
// =========================

const register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      role,
      phone,
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    findUserByEmail(email, async (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }

      if (result.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      createUser(
        {
          full_name,
          email,
          password: hashedPassword,
          role: role || "couple",
          phone: phone || null,
        },
        (err, result) => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              success: false,
              message: "Registration failed.",
            });
          }

          return res.status(201).json({
            success: true,
            message: "Registration successful.",
            data: {
              id: result.insertId,
              full_name,
              email,
              role: role || "couple",
            },
          });
        }
      );
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


// =========================
// LOGIN
// =========================

const login = (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    findUserByEmail(email, async (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const user = result[0];

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          bio: user.bio,
        },
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


// =========================
// GET PROFILE
// =========================

const getProfile = (req, res) => {
  findUserById(req.user.id, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};


// =========================
// UPDATE PROFILE
// =========================

const editProfile = (req, res) => {
  const profileData = {
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone || null,
    bio: req.body.bio || null,
  };

  if (!profileData.full_name || !profileData.email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email are required.",
    });
  }

  updateProfile(
    req.user.id,
    profileData,
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Failed to update profile.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
      });
    }
  );
};


// =========================
// EXPORTS
// =========================

module.exports = {
  register,
  login,
  getProfile,
  editProfile,
};