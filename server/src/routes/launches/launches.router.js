const express = require('express');
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}=require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
//launchesRouter.get('/history', getAllLaunches);
launchesRouter.post('/',httpAddNewLaunch);
launchesRouter.delete('/:id',httpAbortLaunch);

module.exports={
    launchesRouter,
};