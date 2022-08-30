const fs=require('fs');  
const path = require('path');

const {parse}=require('csv-parse');

const habitablePlanets=[];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] ==='CONFIRMED' //checking if its a confirmed candidate
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 //light/energy reaching the planet should be between 0.36-1.11 times that of earth
        && planet['koi_prad']<1.6; //size shouldn't be greater than 1.6 times of earth
}

function loadPlanetsData(){
    return new Promise((resolve,reject)=>{

        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', (data) => {
            if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
            }));
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    });
}


module.exports={
    loadPlanetsData,
    planets: habitablePlanets,
};