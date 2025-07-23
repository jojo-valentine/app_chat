const { User } = require("../models");
const {
  createUserSchema,
  validateLoginUser,
} = require("../validations/userValidation");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || null;
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body); // <-- เพิ่มบรรทัดนี้เช็คข้อมูลที่ส่งมา

    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", message: error.details[0].message });
    }

    const existingUser = await User.findOne({ where: { email: value.email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Email already exists" });
    }

    const newUser = await User.create(value);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error, value } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        error: error.details[0].message,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "ไม่พบผู้ใช้งาน",
      });
    }
    console.log(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
        errors: [
          {
            field: "password",
            message: "Invalid email or password.",
          },
        ],
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );
    return res.status(200).json({
      status: "success",
      message: "เข้าสู่ระบบสำเร็จ",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
