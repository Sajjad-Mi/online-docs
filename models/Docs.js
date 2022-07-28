const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
    title: {
      type: String
    },
    body: {
      type: String
    },
    admins: [String],
    users: [String],
    docDate:{
      type: Date
    }
  });
 
  const Docs = mongoose.model('docs', docsSchema);

  module.exports = Docs;  