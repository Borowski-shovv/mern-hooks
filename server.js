const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//  set up express
const app = express();
const PORT = process.env.PORT || 5000;

// zabezpieczenie podczas współdzielenia zasobów mieży źródłami
app.use(cors());
app.use(express.json());

// set up mongoose
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB successfully connected");
})

const userRouter = require('./routes/userRouter');

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

