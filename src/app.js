const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const flash = require('express-flash');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy, localStrategy, serializeUser, deserializeUser } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const apiRoutes = require('./routes/api');
const ejsRoutes = require('./routes/ejs');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// session
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
  })
);

// view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(`${__dirname}/public`)));

// method override
app.use(methodOverride('_method'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use('jwt', jwtStrategy);
passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

// v1 api routes
app.use('/api', apiRoutes);
app.use('/', ejsRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
