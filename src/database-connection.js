const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/FederalStock')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log('Error to Connecting MongoDB', err))

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Waldachtal' })
// kitty.save().then(() => console.log('meow'))
