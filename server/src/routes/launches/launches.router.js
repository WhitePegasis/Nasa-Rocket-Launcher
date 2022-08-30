const express = require('express');
const {getAllLaunches}=require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);
//launchesRouter.get('/history', getAllLaunches);

module.exports={
    launchesRouter,
};