// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true,useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://mongoKT:Micr0@123@testcluster.7s1cf.mongodb.net/test', { useNewUrlParser: true,useUnifiedTopology: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we re connected!');
});

module.exports = db;