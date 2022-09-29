module.exports = (sequelize, DataTypes) => {
  const Novel_category = sequelize.define(
    'Novel_category',
    {},
    { underscored: true }
  );
  return Novel_category;
};
