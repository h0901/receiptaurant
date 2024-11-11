module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
      res_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    Restaurant.associate = (models) => {
      Restaurant.hasMany(models.Surcharge, {
        foreignKey: 'res_id',
        onDelete: 'CASCADE', 
      });
  
    return Restaurant;
  };
}; 
  