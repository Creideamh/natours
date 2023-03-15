const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const tour = require('./../../models/tourModel');


dotenv.config({
    path: './config.env'
});

/**
 * Connect to Mongodb
 */
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => console.log("DB Connection successful!"));


// READ JSON FILE
const tours = fs.readFileSync(`${__dirname}/tours-sample.json`, 'utf8');

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await tour.create(JSON.parse(tours));
    console.log('Data Imported Successfully!');
    }catch(err){
    console.log(`Fail to import data ${err}`);
  }
}

// DELETE DATA FROM DB 
const deleteData = async () => {
    try{
        await tour.deleteMany();
        console.log('Data deleted successfully!');
    }catch(err){
        console.log(`Fail to delete data ${err}`);
    }
};


if(process.argv[2] === '--import'){
  importData();
  console.log('Data Imported Successfully!');

    process.exit();
}else if (process.argv[2] === '--delete'){
    deleteData();
}

