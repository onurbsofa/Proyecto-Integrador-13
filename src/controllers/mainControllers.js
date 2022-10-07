

const mainControllers = {


index : (req,res) => {
    res.render('index');
},

carritoCompras : (req,res) =>{
    res.render('carrito');  
},

}

module.exports = mainControllers;