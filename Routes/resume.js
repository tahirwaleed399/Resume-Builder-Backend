let express = require('express');
const authController = require('../Controllers/authController.js')
const  resumeController = require('../Controllers/resumeController.js');

let router = express.Router()
router.get('/resumes', authController.protectRoute,resumeController.getResumes);
router.delete('/resume', authController.protectRoute,resumeController.deleteResume);
router.post('/create-resume', authController.protectRoute,resumeController.createResume);

module.exports = router;