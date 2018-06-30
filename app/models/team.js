var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    team: {
        teamName: String,
        season:[{
                period: String,
                players:[{
                    player_id: String,
                }]
        }]      
    },
});

// statsSchema.methods.getGoals = function(cb){
//     return this.model('Goals').find({goals: this.goals}, cb);
// }
module.exports = mongoose.model("Team", teamSchema);