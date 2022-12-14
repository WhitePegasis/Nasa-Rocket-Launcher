const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches=new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch ={
    flightNumber: 100,
    mission: 'Kepler Exp X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber'); //descending order on the basis of flightNumber

    if(!latestLaunch ){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

launches.set(launch.flightNumber, launch);

async function getAllLaunches(){
    //return Array.from(launches.values());
    return await launchesDatabase.find({},{ '_id':0, '__v':0})
}

async function saveLaunch(launch){

    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet){
        throw new Error('No matching planets found!');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch,{
        upsert: true,
    });
}

async function scheduleNewLaunch(launch){

    const newFlightNumber = await getLatestFlightNumber() +1;
    const newLaunch = Object.assign(launch,{
        success: true,
        upcoming: true,
        customers: ['ZTM','NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

// function addNewLaunch(launch){
//     latestFlightNumber++;
//     launches.set(latestFlightNumber, Object.assign(launch,{
//         flightNumber: latestFlightNumber,
//         customers: ['ZTM','NASA'],
//         upcoming: true,
//         success: true,
//     })
//     );
// } 

async function abortLaunchById(launchId){

    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    },{
        upcoming: false,
        success: false,
    });

    return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports={
    scheduleNewLaunch,
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
};
