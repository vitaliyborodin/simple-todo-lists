var mongoose = require('mongoose');

var categoriesSchema = mongoose.Schema({
   priority: Number,
   user: String,
   date: Date,
   name: String, 
   tasks: [{
      priority: Number,
      date: Date,
      deadline: Date,
      text: String,
      done: Boolean
   }]
});

module.exports = mongoose.model('lists', categoriesSchema);