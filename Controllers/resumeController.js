const { catchAsyncErrors } = require("../Utils/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Resume = require("../Models/Resume");
const { jsonResponce } = require("../Utils/responce");
exports.createResume = catchAsyncErrors(async (req, res, next) => {
    
   let {basicInfo,skills , achievements,education , contactDetails , workExperience} = req.body;
if(basicInfo.name.length < 1 || basicInfo.title.length < 1 || basicInfo.summary.length < 1 || contactDetails.phone.length < 1 || contactDetails.email.length < 1) {
jsonResponce(res , 400 , false , {message : "Please Fill Your Fields Correctly"});
}
   if(basicInfo.profile.length > 10){
    const {url, public_id} = await cloudinary.v2.uploader.upload(basicInfo.profile  , {
      folder:'ResumeBuilder'
    });
   basicInfo.profile = {url, public_id};
   }else {
   basicInfo.profile = undefined;
   }
  
   const result = await Resume.create({createdBy : req.user._id ,basicInfo,skills , achievements,education , contactDetails , workExperience} )
   
jsonResponce(res , 200 , true , result)
  });
  exports.getResumes = catchAsyncErrors(async (req, res, next) => {
    const resumes = await Resume.find({createdBy : req.user._id});
    jsonResponce(res , 200 , true, resumes);

  });  
  
  exports.deleteResume = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.body ;
    const result = await Resume.findByIdAndDelete(id);
    jsonResponce(res , 200 , true, result);

  });