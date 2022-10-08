const cloudinary = require('../config/cloudinary');

exports.upload = async (path) => {
  const res = await cloudinary.uploader.upload(path);
  return res.secure_url;
};
