const mongoose = require('mongoose');
const colors = require('colors');


// Connect to Atlas MongoDB (Cloud)
module.exports.Atlas = async () => {
  console.log(` \u2601 : Connecting to the cloud.... `.white.bgBlack);
  const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`Atlas MongoDB Connected on the Cloud : ${conn.connection.host}`.cyan.underline.bold);
};
