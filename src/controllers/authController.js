const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '1d',
  });

exports.register = async (req, res, next) => {
  try {
    const { userName, password, confirmPassword, email, role } = req.body;

    // if (!userName) {
    //   throw new AppError('username is require', 400);
    // }
    if (!password) {
      throw new AppError('password is require', 400);
    }
    // if (password.value.match('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$')) {
    //   throw new AppError(
    //     'Minimum eight characters, at least one letter and one number',
    //     400
    //   );
    // }
    if (!confirmPassword) {
      throw new AppError('confirm password is require', 400);
    }
    if (password !== confirmPassword) {
      throw new AppError('password and confirm password did not match', 400);
    }

    if (!email) {
      throw new AppError('Email is require', 400);
    }

    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      throw new AppError('Email is invalid format', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      password: hashedPassword,
      email,
      role,
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
