const express = require('express');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-error');

const rateLimit = require('express-rate-limit');

const app = express();

const cors = require('cors');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

app.use(limiter);

const helmet = require('helmet');

app.use(helmet());

const mongoose = require('mongoose');

const allowedCors = [
  'http://api.mesto-stukalov.nomoredomains.club',
  'https://mesto-stukalov.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

const { PORT = 3001 } = process.env;

const bodyParser = require('body-parser');

const {
  celebrate,
  Joi,
  errors,
} = require('celebrate');

const auth = require('./middlewares/auth');

const {
  createUser,
  login,
} = require('./controllers/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    }),
  }),
  createUser);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), login);

app.use(auth);

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.get("/logout", (req, res) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

app.use('*', require('./routes/otherRoutes'));

// app.all('*', () => {
//   throw new NotFoundError('Запрашиваемый ресурс не найден');
// });


mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
