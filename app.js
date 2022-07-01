const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
// useCreateIndex: true,
// useFindAndModify: false,
// });

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '62bca84e902f90f9fe54558f',
  };

  next();
});

app.use('/', routerUsers);
app.use('/', routerCards);
app.use('*', (req, res) => res.send({ message: 'Несуществующий путь' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
