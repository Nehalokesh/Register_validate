const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser=require('body-parser')
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const validate = require('./src/validators/validation');
const routes = require('./src/routes/userRouter');
const config = require('./src/config/config');
const userModels = require('./src/models/user'); 
const path = require('path');
const fs = require('fs');


mongoose.set('strictQuery', true);
const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS

app.set('view engine', 'ejs');

// Specify the views directory
app.set("views", path.join(__dirname, "src", "views"));

app.get('/', (req, res) => {
  res.render('register');
});



// Create a write stream for logs
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Log requests
app.use(morgan('combined', { stream: accessLogStream }));

// Use cors3
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());


// Load the routes
app.use(routes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});


// Start the server
const port = config.port;

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
});