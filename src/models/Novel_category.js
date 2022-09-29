module.exports = (sequelize, DataTypes) => {
  const Novel_category = sequelize.define(
    'Novel_category',
    {},
    { underscored: true }
  );
  Novel_category.associate = (db) => {
    Novel_category.belongsTo(db.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Novel_category.belongsTo(db.Novel, {
      foreignKey: {
        name: 'novelId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Novel_category;
};
