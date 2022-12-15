function intensidadData(sequelize, Datatypes){

    alias = 'intensidad';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},

    }
    
    config = {tableName: "intensidad", camelCase: false, timestamps: false}; 
    
    const intensidad = sequelize.define(alias,cols,config)

    intensidad.associate = function (modelos){

        intensidad.hasMany(modelos.producto, {   
          as: "producto",
          foreignKey: "intensidad_id"
        });
      }
    
    return intensidad;
    
    }
    
    
    module.exports = intensidadData;