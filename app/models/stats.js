// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var statsSchema = mongoose.Schema({
    User: {
        season:{
                name: String,
                goals: Number,
                assists: Number,
                games: Number,
        }       
    }
})

statsSchema.methods.getGoals = function(cb){
    return this.model('Goals').find({goals: this.goals}, cb);
}
module.exports = mongoose.model("stats", statsSchema);