const express = require("express");
const bodyParser = require('body-parser');
const uroute = require("./src/routes/user");
const userinputvalidator = require("./src/middlewares/userAuthenticate");
const User = require("./src/db"); // Importing the User model
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = 3000;
app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(bodyParser.json()); // For JSON data

// Middleware for admin and user routes
app.use("/user", uroute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
