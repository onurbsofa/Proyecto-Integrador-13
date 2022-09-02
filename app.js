const express = require('express');
const path = require ('path');
const app = express() ;

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) ); 

app.listen(3000,function() {
    console.log('Corriendo');
});

app.get('/Index', (req,res) => {
    res.sendFile(path.join(__dirname,'./views/index.html'));
});
