const app = require("./app"); //gets app from app.js
const mongoose = require("mongoose"); //gets mongoose
require("dotenv").config(); //takes dotenv(PORT & MONGO_URI) and adds it to the process

const PORT = process.env.PORT || 9999; //gives dotenv from the process to PORT
app.listen(PORT, () => console.log("Server running at http://localhost:" + PORT)); //starts server at PORT from env from the process

mongoose
    .connect(process.env.MONGO_URI) //connects the database to MONGO_URI from env from the process
    .then(() => console.log("connected to DB")) //writes a message if connection is successful
    .catch((err) => console.log(err.message)); //Writes an error message if the connection failed
