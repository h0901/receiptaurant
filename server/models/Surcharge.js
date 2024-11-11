module.exports = (sequelize, DataTypes) => {
    const Surcharge = sequelize.define('Surcharge', {
        surcharge_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        surcharge_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surcharge_percentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        res_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
                key: 'res_id',
            },
        },
    });

    Surcharge.associate = (models) => {
        Surcharge.belongsTo(models.Restaurant, {
            foreignKey: 'res_id',
            onDelete: 'CASCADE', 
        });
    };

    return Surcharge;
};
