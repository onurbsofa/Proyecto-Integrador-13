function usuarioMiddleware(req,res,next){
    if(req.session.usuarioLogeado != undefined){
        next();
    }else{
        res.send('Esta pagina es solo para usuarios');
    }
}

module.exports = usuarioMiddleware;