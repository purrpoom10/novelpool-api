module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    'Chapter',
    {
      chapterName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Chapter.associate = (db) => {
    Chapter.hasMany(db.Order, {
      foreignKey: {
        name: 'chapterId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Chapter;
};
