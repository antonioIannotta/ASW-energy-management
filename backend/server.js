const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI_ATLAS='mongodb+srv://admin:F2NKjPXoeR8o91iT@cluster0.p3uht.mongodb.net/test?retryWrites=true&w=majority'
const MONGO_LOCAL='mongodb://localhost:27017/test'

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_LOCAL);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});