module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },{
    tableName: 'User',
  });

  User.associate = (models) => {
    User.belongsTo(models.blogPost, {
      foreignKey: 'userId',
      as: 'blogpost',
    });
  };

  return User;
};