const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kisansuvidha', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
  }
};