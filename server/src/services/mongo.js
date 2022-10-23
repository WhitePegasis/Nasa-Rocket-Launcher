const mongoose = require('mongoose');
const MONGO_URL='mongodb+srv://nasa-api:ryNbrcLJANdfARaR@nasacluster.sto3yzu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', ()=>{
    console.log('MongoDb connection ready!');
});

mongoose.connection.on('err', ()=>{
    console.error(err);
});

async function mongoConnect(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        // useFindAndModify: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    });
}

module.exports= {
    mongoConnect,
};