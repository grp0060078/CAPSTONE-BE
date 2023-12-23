//models/Query.js

const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  student: { type: String, required: true },
  category: { type: String, required: true },
  voiceCommunicationLanguage: { type: String, required: true },
  queryTitle: { type: String, required: true },
  queryDescription: { type: String, required: true },
  availableTime: {
    from: { type: String, required: true },
    till: { type: String, required: true },
  },
  solution: { type: String },
});

module.exports = mongoose.model('Query', querySchema);
