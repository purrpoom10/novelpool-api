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
  return Order;
};
