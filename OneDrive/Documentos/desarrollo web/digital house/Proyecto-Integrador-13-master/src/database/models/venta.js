function ventaData(sequelize, Datatypes){

    alias = 'venta';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      monto_unitario: {type: Datatypes.DECIMAL(2,10)},
      cantidad: {type: Datatypes.INTEGER},
      detalle_venta_id: {type: Datatypes.INTEGER},
      usuario_id: {type: Datatypes.INTEGER},
      producto_id: {type: Datatypes.INTEGER},


    }
    
    config = {tableName: "venta", camelCase: false, timestamps: false}; 
    
    const venta = sequelize.define(alias,cols,config)

    venta.associate = function (modelos){

        // venta.belongsTo(modelos.detalle_venta, {   
        //   as: "detalle_venta",
        //   foreignKey: "detalle_venta_id"
        // });

        venta.belongsTo(modelos.usuario, {   
          as: "usuario",
          foreignKey: "usuario_id"
        });

        venta.belongsTo(modelos.producto, {   
          as: "producto",
          foreignKey: "producto_id"
        });
    
    }

     
    return venta

    }
    
    module.exports = ventaData;