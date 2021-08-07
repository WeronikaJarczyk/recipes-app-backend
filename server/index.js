const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// import routes
const userRoute = require('../routes/user');
const trainingRoute = require('../routes/training');
const recipeRoute = require('../routes/recipe');

app.use('/user', userRoute);
app.use('/training', trainingRoute);
app.use('/recipe', recipeRoute);

const PORT = process.env.PORT || 3001;

//connect to DB
const db = mongoose.connect(process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => console.log('connected to db')
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
