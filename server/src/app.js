const path=require('path');
const express=require('express');
const cors = require('cors');
const api=require('./routes/api');
const app=express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public'))); //S:\Node_js\NasaProject\server\public\index.html
//app.use(express.static('public'));

app.use('/v1',api);


app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports=app ;