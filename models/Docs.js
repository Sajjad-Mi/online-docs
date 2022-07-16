const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
    title: {
      type: String
    },
    body: {
      type: String
    },
 
    users: [String]
  });
 
  const Docs = mongoose.model('docs', docsSchema);

  module.exports = Docs;  