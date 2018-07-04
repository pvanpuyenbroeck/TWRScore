var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    player: {
        voornaam: String,
        familienaam: String,
        nummer: Number,
        stats:{
            goals: Number,
            assists: Number,
            games: Number,
        },
        teamid: String,
    }
});

// statsSchema.methods.getGoals = function(cb){
//     return this.model('Goals').find({goals: this.goals}, cb);
// }
module.exports = mongoose.model("Player", playerSchema);