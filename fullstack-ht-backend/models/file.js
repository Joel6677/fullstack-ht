const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  filename: {
    type: String
  },
  mimetype: {
    type: String
  },
  encoding: {
    type: String
  },
  path: {
    type: String
  }
})

module.exports = mongoose.model('File', schema)