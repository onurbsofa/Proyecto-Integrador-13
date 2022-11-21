function usuarioData(sequelize, dataTypes){

    alias = 'usuario';
    
    cols = {
      id: {type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: dataTypes.STRING(45)},
      email: {type: dataTypes.STRING(45)},
      clave: {type: dataTypes.STRING(100)},
      imagen: {type: dataTypes.STRING(45)},
      admin: {type: dataTypes.TINYINT(1)},

    }
    
    config = {tableName: "usuario", camelCase: false, timestamps: false}; 
    
    const usuario = sequelize.define(alias,cols,config)

    usuario.associate = function(modelos){

        usuario.hasMany(modelos.venta, {   
          as: "venta",
          foreignKey: "usuario_id"
        });
      }
    
    return usuario;
    
    }
        
    module.exports = usuarioData
    