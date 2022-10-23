const planetsRouter=require('./planets/planets.router');
const {launchesRouter}=require('./launches/launches.router');
const express=require('express');


const api= express.Router();
api.use('/planets',planetsRouter);
api.use('/launches',launchesRouter); //only accept request under /launches route i.e /launches is the root for all request

module.exports=api;