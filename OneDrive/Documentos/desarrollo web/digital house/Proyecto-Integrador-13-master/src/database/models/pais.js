function paisData(sequelize, Datatypes){

    alias = 'pais';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},

    }
    
    config = {tableName: "pais", camelCase: false, timestamps: false}; 
    
    const pais = sequelize.define(alias,cols,config)

    pais.associate = function (modelos){

        pais.hasMany(modelos.producto, {   
          as: "producto",
          foreignKey: "pais_id"
        });
      }
    
    return pais;
    
    }
    
    
    module.exports = paisData;