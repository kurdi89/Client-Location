const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/.env' });

// Load models
const User = require('./models/User');


const connectDB = async ()=> {
    // Connect to Atlas DB
    console.log('connecting to the database')
    const ATLAS_URI = await `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    await mongoose.connect(ATLAS_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=>{console.log(`Seeder connected to MongoDB On Atlas on Cloud`.green.bgBlack.underline.bold)})
    .catch(err => {if(err) console.log(`Could not connet to Atlas MongoDB on Cloud`.red.inverse.bold, {err})});
}



// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);





// Import into DB
const importData = async () => {
  try {

    await User.create(users);
    
    console.log('Data Imported...'.green.inverse.bold);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    
    await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse.bold);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};





if (process.argv[2] === '-i') {
  connectDB()
  importData();
} else if (process.argv[2] === '-d') {
  connectDB()
  deleteData();
}
