
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require("express");
const app = express();
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const userRouter = require("./src/route/userRoute");
const bodyParser = require('body-parser');
const cors = require("cors");
const xXssProtection = require("x-xss-protection");
const helmet = require("helmet");
require("./src/DB/conn");
const scheduleMeetingEmails = require('./src/middleware/emailService');
// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(xXssProtection());

// CORS setup
const whitelist = [process.env.CLIENT_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

// Security headers setup
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Cleaned up duplicate body parser

// Trust proxy
app.set('trust proxy', 1);

// Common error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.sendStatus(400);
    }
    next();
});

// Routes
app.use('/api', userRouter);


// Schedule email job
// scheduleMeetingEmails();

const port = process.env.API_PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);

});
