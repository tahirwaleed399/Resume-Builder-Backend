const mongoose = require("mongoose");

const { Schema } = mongoose;
const resumeSchema = new mongoose.Schema({
  basicInfo: {
    type: {
      name: String,
      title: String,
      summary: String,
      gender: String,
      profile: {
        url: String,
        public_id: String,
      },
    },
    required: [true, "Basic Info is required"],
  },
  contactDetails: {
    type: {
      phone: String,
      email: String,
      website: String,
      linkedin: String,
      
    },
    required: [true, "Contact Details are required is required"],
  },
  skills: {
    type: [
      {
        skill: String,
        skillPercentage: Number,
      },
    ],
    required: [true, "Skills are required is required"],
  },

  achievements: [{
    achievement: String,
  }],
  education: [{
    title: String,
    institute: String,
    startDate: Date,
    endDate: Date,
  }],
  workExperience: [{
    companyName: String,
    role: String,
    location: String,
    description: String,
    startDate: Date,
    endDate: Date,
  }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Duplicate the ID field.
resumeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
resumeSchema.set("toJSON", {
  virtuals: true,
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
