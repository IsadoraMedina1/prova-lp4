const mongoose = require('mongoose');

// Definindo o modelo do time
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    isoCode: {
        required: true,
        type: String
    },
    teamCoach: {
      required: true,
      type: String
    },
    worldCupsWon: {
      required: true,
      type: Number
    },
    flagLink: {
      required: true,
      type: String
    }
})

module.exports = mongoose.model('Team', dataSchema)