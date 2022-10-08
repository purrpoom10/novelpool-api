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

    if (!password) {
      throw new AppError('password is require', 400);
    }

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

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (typeof userName !== 'string' || typeof password !== 'string') {
      throw new AppError('username or password is invalid', 400);
    }
    const user = await User.findOne({ where: { userName: userName } });

    if (!user) {
      throw new AppError('username or password is invalid', 400);
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      throw new AppError('username or password is invalid', 400);
    }

    const token = genToken({ id: user.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
