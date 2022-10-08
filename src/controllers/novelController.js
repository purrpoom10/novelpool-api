const fs = require('fs');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const { Novel, User } = require('../models');

exports.createNovel = async (req, res, next) => {
  try {
    const { novelName, title } = req.body;
    if (
      (!title || !title.trim()) &&
      (!novelName || !novelName.trim()) &&
      !req.file
    ) {
      throw new AppError('title novelName image is required', 400);
    }

    const data = { userId: req.user.id };

    if (novelName) {
      data.novelName = novelName;
    }
    if (title) {
      data.title = title;
    }
    if (req.file) {
      data.image = await cloudinary.upload(req.file.path);
    }

    const novel = await Novel.create(data);
    res.status(201).json({ novel });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllNovel = async (req, res, next) => {
  try {
    const allNovel = await Novel.findAll({
      include: [{ model: User }],
    });
    res.status(200).json({ allNovel });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getUserNovel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userNovel = await User.findOne({
      attributes: { exclude: 'password' },
      where: { id: id },
      include: [{ model: Novel }],
    });
    res.status(200).json({ userNovel });
  } catch (err) {
    next(err);
  }
};

exports.deleteNovel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteNovel = await Novel.findOne({ where: { id: id } });
    if (!deleteNovel) {
      throw new AppError('cannot delete novel', 400);
    }
    await deleteNovel.destroy();
    res.status(200).json({ message: 'delete successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateNovel = async (req, res, next) => {
  try {
    const { novelName, title } = req.body;
    const { id } = req.params;
    const data = {};
    let image;
    if (req.file) {
      image = await cloudinary.upload(req.file.path);
    }
    if (image) {
      data.image = image;
    }
    if (novelName) {
      data.novelName = novelName;
    }
    if (title) {
      data.title = title;
    }

    await Novel.update(data, { where: { id: id } });
    res.status(200).json({ message: 'Update Successfully' });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
