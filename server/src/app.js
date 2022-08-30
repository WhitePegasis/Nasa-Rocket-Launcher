
const path=require('path');
const express=require('express');
const cors = require('cors');
const planetsRouter=require('./routes/planets/planets.router');
const {launchesRouter}=require('./routes/launches/launches.router');

const app=express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));
//app.use(express.static('public'));

app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter); //only accept request under /launches route i.e /launches is the root for all request

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'favicon.png'));
});


/*
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});*/

module.exports=app ;