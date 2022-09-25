const userControllers = {
    
login :  (req,res) =>{
    res.render('user/login');  
},

registro : (req,res) =>{
    res.render('user/registro');               
},

recContra : (req,res) =>{
    res.render('user/rec_contra');            
}

}

module.exports = userControllers;