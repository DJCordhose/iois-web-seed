const mongoose = require('mongoose');
// store url in external dependency and exclude remote one (containing password) from git
//const url = require('./remote-mongo-url');
const url = require('./local-mongo-url');
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Successfully connected to mongo db"));

const greetingSchema = mongoose.Schema({
    greeting: String
});
const Greeting = mongoose.model('Greeting', greetingSchema);

function save(greeting, callback) {
    var greeting = new Greeting({greeting});
    greeting.save(callback);
}

function load(id, callback) {
    // TODO: find by id, how to?
    Greeting.find({_id: id}, callback);
}

module.exports = {
    save,
    load
};