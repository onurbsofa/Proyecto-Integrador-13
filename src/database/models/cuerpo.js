function cuerpoData(sequelize, Datatypes){

    alias = 'cuerpo';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},

    }
    
    config = {tableName: "cuerpo", camelCase: false, timestamps: false}; 
    
    const cuerpo = sequelize.define(alias,cols,config)

    cuerpo.associate = function (modelos){

        cuerpo.hasMany(modelos.producto, {   
          as: "producto",
          foreignKey: "cuerpo_id"
        });
      }
    
    return cuerpo;
    
    }
    
    
    module.exports = cuerpoData;