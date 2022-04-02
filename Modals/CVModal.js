const mongoose =  require("mongoose")

const PersonalInfoScheama = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    phone : String,
    city : String,
    dateOfBirth : Date ,
    profession : String
})

const EducarionScheama = mongoose.Schema({
    schoolName : String,
    schoolLocation : String,
    degree : String ,
    fieldOfStudy : String,
    graduationStartDate : Date,
    graduationEndDate : Date
})

const WorkHistoryScheama = mongoose.Schema({
    title : String ,
    desc : String
})

const SocialMediaScheama = mongoose.Schema({
    type : String,
    url:String,
})

const SkillsScheama = mongoose.Schema({
    skill : String , 
    level : Number
})

const CertaficatesScheama = mongoose.Schema({
    title : String,
    desc : String,
    url : String
})
const LanguesScheama  =mongoose.Schema({
    langue : String,
    level : String
})


const CvScheama = mongoose.Schema({
    tempate : Number,
    personalInfo  : PersonalInfoScheama,
    summary : String ,
    socialMedia : [SocialMediaScheama] ,
    skills : [SkillsScheama],
    workHistory : [WorkHistoryScheama],
    certaficates : [CertaficatesScheama],
    education : EducarionScheama,
    langues : [LanguesScheama]
})

const CVModal = mongoose.model("CvModal" , CvScheama)
module.exports = CVModal


