const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        max: 100
      },
      get(){
        const value= this.getDataValue('height')
        return `${value} cm`
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate:{
        max: 150
      },
      get(){
        const value = this.getDataValue('weight')
        return value ? `${value} kg` : null
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 35,
      }
    },
    img:{
      type: DataTypes.STRING(1234),
      defaultValue: 'Image not found'
    }
  }, {
    timestamps:false
  } );
};
