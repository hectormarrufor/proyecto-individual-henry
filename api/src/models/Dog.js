const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    // Model attributes are defined here
    weight_metric: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight_imperial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height_metric: {

        type: DataTypes.STRING,
        allowNull: false,

    },
    height_imperial: {

        type: DataTypes.STRING,
        allowNull: false,

    },

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bred_for: {
        type: DataTypes.STRING,
    },
    breed_group: {
        type: DataTypes.STRING,
    },
    life_span: {
        type: DataTypes.STRING,
    },
    temperament: {
        type: DataTypes.STRING,
    },
    origin: {
        type: DataTypes.STRING,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
};
