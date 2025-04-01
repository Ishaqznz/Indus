const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err))
}

module.exports = {
    connectDB
}