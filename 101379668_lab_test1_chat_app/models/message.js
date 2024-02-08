const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
  message: String,
});

const Message = mongoose.model('Message', messageSchema);
