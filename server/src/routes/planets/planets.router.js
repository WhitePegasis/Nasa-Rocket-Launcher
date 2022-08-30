const express= require('express');
const {httpGetAllPlanets} = require('./planets.controller');

const planetsRouter=express.Router();

planetsRouter.get('/', httpGetAllPlanets);

console.log('routing /planets...');

module.exports = planetsRouter;