function productoData(sequelize, Datatypes){

    alias = 'producto';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
      precio: {type: Datatypes.DECIMAL(2,10)},
      imagen: {type: Datatypes.STRING(45)},
      descripcion: {type: Datatypes.STRING(45)},
      pais_id: {type: Datatypes.INTEGER},
      cuerpo_id: {type: Datatypes.INTEGER},
      intensidad_id: {type: Datatypes.INTEGER},
      
    }
    
    config = {tableName: "producto", camelCase: false, timestamps: false}; 
    
    const producto = sequelize.define(alias,cols,config)

    producto.associate = function (modelos){

        producto.belongsTo(modelos.pais, {   
          as: "pais",
          foreignKey: "pais_id"
        });
    
    }

    producto.associate = function (modelos){

        producto.belongsTo(modelos.cuerpo, {   
          as: "cuerpo",
          foreignKey: "cuerpo_id"
        });
    
    }

    producto.associate = function (modelos){

        producto.belongsTo(modelos.intensidad, {   
          as: "intensidad",
          foreignKey: "intensidad_id"
        });
    
    }

    producto.associate = function (modelos){

        producto.hasMany(modelos.venta, {   
          as: "venta",
          foreignKey: "producto_id"
        });
      }
    
     
    return producto

    }
    
    module.exports = productoData;