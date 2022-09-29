const { ORDER_PENDING, ORDER_SUCCESS } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: {
        type: DataTypes.ENUM(ORDER_SUCCESS, ORDER_PENDING),
        allowNull: false,
        defaultValue: ORDER_PENDING,
      },
    },
    { underscored: true }
  );

  Order.associate = (db) => {
    Order.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Order.belongsTo(db.Chapter, {
      foreignKey: {
        name: 'chapterId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Order;
};
