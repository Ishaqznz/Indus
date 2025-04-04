const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const userRouter = require('./routes/userRouter')
const { connectDB } = require('./config/connectDB')
const session = require('express-session');


// Session middleware setup
app.use(
  session({
    secret: 'your-secret-key', 
    resave: false,            
    saveUninitialized: true,   
    cookie: { secure: false }  
  })
);

// getting client ip address
app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));

app.use('/', userRouter)



//Connecting to the database
connectDB()


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`);
})