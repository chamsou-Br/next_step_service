const mongoose = require('mongoose')

const CoverLetterScheama = mongoose.Schema({
    template : Number,
    typeJob : String,
    job : String ,
    lastJob : String,
    experience : String,
    yearExperience : String,
    level : String,
    skillsSoftwar : [String],
    skills : [String],
})

const CoverLetterModal = mongoose.model('CoverLetterModal',CoverLetterScheama);
module.exports = CoverLetterModal