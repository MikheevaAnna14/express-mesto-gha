const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const signupValidation = require('./middlewares/signupValidation');
const signinValidation = require('./middlewares/signinValitation');

// const path = require('path');

// const publicDirectoryPath = path.join(__dirname, 'public');

const {
  login,
  createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.static(publicDirectoryPath));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.use('*', (req, res) => res.status(404).send({ message: 'Несуществующий путь' }));

app.use(errors()); // обработчик ошибок celebreate

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res
    .status(err.statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибкa'
        : err.message,
    });
});

// app.use(errors()); // обработчик ошибок celebreate

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
