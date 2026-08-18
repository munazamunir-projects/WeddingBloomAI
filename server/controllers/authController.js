const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail,
  findUserById,
  updateProfile,
} = require("../models/userModel");

const {
  createVendor,
} = require("../models/vendorModel");

const {
  addVendorCategory,
} = require("../models/vendorCategoryMapModel");


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

      // Vendor fields
      business_name,
      category_id,
      address,
      city,
      experience_years,
      description,
    } = req.body;

    // =========================
    // BASIC VALIDATION
    // =========================

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // =========================
    // CHECK EMAIL
    // =========================

    findUserByEmail(email, async (err, result) => {
      if (err) {
        console.log("Find User Error:", err);

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

      // =========================
      // HASH PASSWORD
      // =========================

      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      // =========================
      // CREATE USER
      // =========================

      createUser(
        {
          full_name,
          email,
          password: hashedPassword,
          role: role || "couple",
          phone: phone || null,
        },
        (err, userResult) => {

          if (err) {
            console.log("Create User Error:", err);

            return res.status(500).json({
              success: false,
              message: "Registration failed.",
            });
          }

          const userId = userResult.insertId;

          // =========================
          // COUPLE REGISTRATION
          // =========================

          if (role !== "vendor") {

            return res.status(201).json({
              success: true,
              message: "Couple registration successful.",
              data: {
                id: userId,
                full_name,
                email,
                role: "couple",
              },
            });

          }

          // =========================
          // VENDOR VALIDATION
          // =========================

          if (!business_name || !category_id) {

            return res.status(400).json({
              success: false,
              message:
                "Business name and vendor category are required.",
            });

          }

          // =========================
          // CREATE VENDOR PROFILE
          // =========================

          createVendor(
            {
              user_id: userId,
              business_name,
              description: description || null,
              phone: phone || null,
              email,
              address: address || null,
              city: city || null,
              experience_years:
                experience_years || 0,
              profile_image: null,
            },
            (err, vendorResult) => {

              if (err) {
                console.log(
                  "Create Vendor Profile Error:",
                  err
                );

                return res.status(500).json({
                  success: false,
                  message:
                    "User created but vendor profile could not be created.",
                  error: err.message,
                });
              }

              const vendorId =
                vendorResult.insertId;

              // =========================
              // ADD VENDOR CATEGORY
              // =========================

              addVendorCategory(
                vendorId,
                Number(category_id),
                (err) => {

                  if (err) {
                    console.log(
                      "Add Vendor Category Error:",
                      err
                    );

                    return res.status(500).json({
                      success: false,
                      message:
                        "Vendor profile created but category could not be saved.",
                      error: err.message,
                    });
                  }

                  // =========================
                  // SUCCESS
                  // =========================

                  return res.status(201).json({
                    success: true,
                    message:
                      "Vendor registration successful.",
                    data: {
                      user_id: userId,
                      vendor_id: vendorId,
                      full_name,
                      email,
                      role: "vendor",
                      category_id:
                        Number(category_id),
                    },
                  });

                }
              );

            }
          );

        }
      );

    });

  } catch (error) {

    console.log(
      "Registration Server Error:",
      error
    );

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