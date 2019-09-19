const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stageSchema = new Schema({
  projid:[{type: Schema.Types.ObjectId, ref: 'Project',index:true}],
  stages:[{
    authority:[String],
    auth_no:{type:Number},
    stage_no:{type:Number},
    approval:{type:Boolean},
    proposed_date:{type:Date},
    actual_date:{type:Date},
    docinfo:[{
      doc_name:{type:String},
      check:{type:Boolean}
    }]
  }]
});

module.exports = mongoose.model('Stage',stageSchema);
// Stage.create({
//   name:'test',
//   stages:[{
//     stage_no:1,
//     approval:false,
//     proposed_date:Date.now(),
//     actual_date:Date.now()
//   }]
// },function(err,doc){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(doc)
//   }
// });



// Stage.create({
//   stages:[{
//     stage_no:'1',
//     approval:false,
//     proposed_date:Date.now(),
//     actual_date:Date.now(),
//     docinfo:[{
//       doc_name:'test',
//       check:false
//     }]
//
//   }]
// ,function(err,doc){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(doc)
//   }
// }});
