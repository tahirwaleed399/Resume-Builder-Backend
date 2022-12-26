const express = require('express');
const app = express();
const path = require('path')
const userRouter =  require('./Routes/user.js');
const authRouter =  require('./Routes/auth.js');
const resumeRouter =  require('./Routes/resume.js');
const { jsonResponce } = require('./Utils/responce.js');
const NewErrorHandler = require('./Utils/NewErrorHandler');
const { ErrorController } = require('./Controllers/ErrorController.js');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
var cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
app.use(express.static(path.resolve("./public")));

const limiter = rateLimit({
    max:100, 
    windowMs : 60 *60 *1000,
    message : 'Too many request from the same IP please try in an hour',
})
const corsOptions = {
    origin: ['http://localhost:3000', 'https://waleed-resume.netlify.app'],
    credentials: true,
  }
app.use(cors(corsOptions))
app.use(helmet())
app.use(limiter)
app.use(express.json({
  limit:'50mb'
}));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(mongoSanitize())
app.use(xss());
app.use(cookieParser());

// We use it because while dealing with api features ig i do a query like this &sort=price&sort=ratings then it will make sort array instead of string this package will prevent that
// app.use(hpp({
//     whitelist : [
//         we can whitelist the properties we dont want to happen that 
//     ]
// }));
app.use(hpp());
app.use(userRouter);
app.use(authRouter);
app.use(resumeRouter);
// app.all('*', (req, res , next)=>next(new NewErrorHandler('Route Not Found' , 404)))
app.use(ErrorController)


module.exports = app ;