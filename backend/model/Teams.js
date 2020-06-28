const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Definimos coleccion y esquema
let Team = new Schema({
  // id_team: {
  //   "productid": Number
  // },
  team_name: {
    type: String
  },
  lider_name: {
    type: String
  },
  departamento: {
    type: String
  },
  id_pubg: {
    type: String
  },
  team_email: {
    type: String
  },
  discord: {
    type: String
  },
  subjects: {
    type: Array
    }
  //section: {
  //  type: String
  //}
  // gender: {
  //   type: String
  // },
  // dob: {
  //   type: Date
  //}
}, {
  collection: 'teams'
})

module.exports = mongoose.model('Team', Team)
