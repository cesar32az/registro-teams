const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Definimos coleccion y esquema
let Team = new Schema({
  team_name: {
    type: String
  },
  team_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
}, {
  collection: 'teams'
})

module.exports = mongoose.model('Team', Team)