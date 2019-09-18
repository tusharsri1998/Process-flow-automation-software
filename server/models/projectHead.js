const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const headSchema =new Schema({
    // _id: {type: Schema.Types.ObjectId, ref: 'Project'},
    ppdh:{type:String, required:true},
    imdh:{type:String, required:true},
    qc:{type:String, required:true},
    bdh:{type:String, required:true},
    cc:{type:String, required:true},
    bac:{type:String, required:true},
    li:{type:String, required:true},
    vh:{type:String, required:true},
    animator:{type:String, required:true},
    dtpoperator:{type:String, required:true},
    headid:[{type: Schema.Types.ObjectId, ref: 'Project', index:true}],
    date: {type: Date, default: Date.now()}
});
module.exports = mongoose.model('Head',headSchema);
