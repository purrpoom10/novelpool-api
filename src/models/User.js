module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
      },
    },
    { underscored: true }
  );
  return User;
};
