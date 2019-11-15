const mongoose = require('mongoose');
const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Song', SongSchema);