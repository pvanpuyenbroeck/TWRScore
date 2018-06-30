var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    team: {
        teamName: String,
        season:{
                period: String,
                players:{
                    voornaam: String,
                    familienaam: String,
                    id: String,
                    stats:{
                        goals: Number,
                        assists: Number,
                        games: Number,
                    }
                }
        }       
    }
});

// statsSchema.methods.getGoals = function(cb){
//     return this.model('Goals').find({goals: this.goals}, cb);
// }
module.exports = mongoose.model("Team", teamSchema);