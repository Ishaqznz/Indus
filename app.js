const express = require('express')
const app = express()
require('dotenv').config()
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


app.use('/', userRouter)
app.set('view engine', 'ejs')



//Connecting to the database
connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`);
})