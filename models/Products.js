module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
      itemtitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      leaseduration: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      itemstate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      itemcity: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });

    Products.associate = (models) => {
        Products.belongsTo(models.Users, {
            // onDelete: "cascade",
        });
        Products.hasOne(models.Category, {
            // onDelete: "cascade",
        });
        Products.hasMany(models.Images, {
            // onDelete: "cascade",
        });
    };
    return Products;
  };