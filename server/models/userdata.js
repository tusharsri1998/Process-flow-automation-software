const mongoose = require('mongoose');
const notification = mongoose.Schema({
  content:{type:String},
  approval:{type:Boolean},
  proid:[{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});
const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    notify:[notification],
    user_type:{type:Number, default:'3'}


});

module.exports = mongoose.model('User', userSchema, 'Users');
