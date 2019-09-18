const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    projectid:{
      type:String,
      required:true,
      index:true
    },
    name: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Project', projectSchema, 'projects');
