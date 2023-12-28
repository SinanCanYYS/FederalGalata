const mongoose = require('mongoose')
mongoose
  // .connect('mongodb://127.0.0.1:27017/FederalStock')
  // .connect('mongodb://192.168.2.112:27017/FederalStockTest')
  .connect(process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/FederalStock')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log('Error to Connecting MongoDB', err))
