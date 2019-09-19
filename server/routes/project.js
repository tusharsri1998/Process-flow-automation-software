const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Project = require("../models/project");
const Head = require("../models/projectHead");
const Stage = require("../models/stage");
const User = require("../models/userdata");

router.put('/authority/:Id',function(req,res){
  Stage.findOne({'projid':req.params.Id},function(err,doc){
    doc.stages[0].authority.push(req.body.a1)
    doc.stages[0].authority.push(req.body.a2)
    doc.stages[0].auth_no = req.body.auth_no
    doc.save(function(err){
      if(err){
        console.log(err)
      }else{
        res.json(doc)
      }
    })
  })
})

router.put('/setcheck/:Id',function(req,res){
  console.log(req.body);
  Stage.findOne({'projid':req.params.Id},
  function(err,doc){
    if(err){
      console.log(err)
    }else{
      var ind = doc.stages[parseInt(req.body.no)-1].docinfo.findIndex(x=>x.doc_name = req.body.data.change)
      console.log(ind)
      doc.stages[parseInt(req.body.no)-1].docinfo[ind].check = true;
      doc.save(function(err){
        if(err){
          console.log(err)
        }else{
          res.json(doc)
        }
      })
    }
  })
})

router.put('/docadd/:Id',function(req,res){
  console.log(req.body);
  Stage.findOne({'projid':req.params.Id},function(err,doc){
    if(err){
      console.log(err)
    }else{
      doc.stages[parseInt(req.body.no)-1].docinfo.push({
        doc_name: req.body.data.docname,
        check: req.body.data.doccheck
      })
      doc.save(function(err){
        if(err){
          console.log(err)
        }else{
          res.json(doc)
        }
      })
    }
  })
})



router.put('/setactdate/:Id',function(req,res){
  console.log(req.body);
  Stage.findOne({'projid':req.params.Id},function(err,doc){
    if(err){
      console.log(err)
    }else{
      doc.stages[parseInt(req.body.no)-1].actual_date = req.body.data.acdate
      doc.save(function(err){
        if(err){
          console.log(err)
        }else{
          res.json(doc)
        }
      })
    }
  })
})


router.put('/changedate/:Id',function(req,res){
  console.log(req.body);
  Stage.findOne({'projid':req.params.Id},function(err,doc){
    if(err){
      console.log(err)
    }else{
      doc.stages[parseInt(req.body.no)-1].proposed_date = req.body.data.cdate
      doc.save(function(err){
        if(err){
          console.log(err)
        }else{
          res.json(doc)
        }
      })
    }
  })
})


router.get('/givestages/:Id',function(req,res){
  Stage.findOne({'projid':req.params.Id},function(err,doc){
    if(err){
      res.json(err)
      console.log(err)
    }else{
      console.log('stage data')
      res.json(doc)
    }
  })
})

router.put('/partdoc/:Id',function(req,res){
  Stage.findOneAndUpdate({'projid':req.params.Id,'stage_no':req.body.stage_no,'doc_name':req.body.doc_name},
  {
    "$set":{
      "docinfo.$.check":true
    }
  },
  function(err,doc){
    if(err){
      console.log(err)
    }else{
      console.log('yay')
      res.json(doc)
      }
    })
  })

var count1=0
router.put('/checktrue',function(req,res){

  console.log(req.body);
  User.findOneAndUpdate({'_id':req.body.user._id, 'notify._id':req.body.data._id},
  {
    "$set":{
      "notify.$.approval":true
    }
  },
  function(err,doc){
    if(err){
      console.log(err)
    }else{
      console.log(doc)
    }
  })
  Stage.findOne({'projid':req.body.data.proid[0]},function(err,doc){
    if(err){
      console.log(err)
    }else{
      var p = req.body.data.content.split(" ");
      console.log(p);
      var c = parseInt(p[p.length-1]);
      count1++;
      console.log(count1);
      if(doc.stages[c-1].auth_no==count1){
        doc.stages[c-1].approval = true;
        doc.save(function(err){
          if(err){
            console.log(err)
          }else{
            // res.json(doc);
            console.log(doc);
            count1=0;
          }
        })
      }else{
        console.log('approval pending')
      }
    }
  })
  User.findOne({"name":req.body.name},function(err,data){
    data.notify.push({content:'Stage approved',approval:false});
    data.save(function(err){
      if(err){
        console.log(err)
      }else{
        console.log('success');
        res.json(data);
      }
    })
  })
})


router.post('/newstage/:Id',function(req,res){
  var counter = 0
  Stage.findOne({'projid':req.params.Id},function(err,doc){
    console.log(doc);
    doc.stages.push({
      stage_no:req.body.t,
      approval:false,
      proposed_date:req.body.data.proposed_date,
      // actual_date:req.body.actual_date
    })
    for(var j=0;j<req.body.auth.length;j++){
      counter++;
      doc.stages[parseInt(req.body.t)-1].authority.push(req.body.auth[j])
    }
    doc.stages[parseInt(req.body.t)-1].auth_no=counter;
    for(var i=0;i<req.body.docarr.length;i++){
      doc.stages[parseInt(req.body.t)-1].docinfo.push({doc_name:req.body.docarr[i].Item, check:req.body.docarr[i].check})
    }
    doc.save(function(err){
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(doc)
      }
    });
  })

});

router.post('/enter/:Id',function(req,res){
  var count = 0
  var newstage = new Stage();
  console.log(req.body);
  newstage.projid = req.params.Id;
  newstage.stages.push({
    stage_no : 1,
    approval : false,
    proposed_date : req.body.data.proposed_date,
    // actual_date : req.body.data.actdate,
  });
  for(var j=0;j<req.body.auth.length;j++){
    count++;
    newstage.stages[0].authority.push(req.body.auth[j])
  }
  newstage.stages[0].auth_no = count;
  for(var i=0;i<req.body.docarr.length;i++){
    newstage.stages[0].docinfo.push({
      doc_name:req.body.docarr[i].Item,
      check:req.body.docarr[i].check
    });
  }
  newstage.save(function(err,data){
    if(err){
      console.log(err);
      res.json(err)
    }else{
      console.log(data);
      res.json(data)
    }
  })
})

const checkToken = (req, res, next) => {
    var titi = req.headers['authorization'];
    console.log(titi);
    // console.log(req.headers);
    if(typeof titi !== 'undefined') {
        const bearer = titi.split('.');
        const token = bearer[1];
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


router.get('/all',function(req,res) {
  console.log('get data');
  Project.find({})
  .exec(function(err,projects){
    if(err){
      console.log('err')
    }else{
      res.json(projects);
    }
  });
});

router.get('/project/:Id',function(req,res){
  Project.findOne({'_id':req.params.Id})
  .exec(function(err,project){
    if(err){
      console.log(err)
    }else{
      res.json(project);
      console.log(project);
    }
  })
});

router.post('/new', function(req,res){
  console.log('post request');
  var newproject = new Project();
  newproject.projectid = req.body.projectid;
  newproject.name = req.body.name;
  newproject.save(function(err,insertedproject) {
    if(err){
      console.log('Error saving project');
    }else{
      res.json(insertedproject);
    }
  });
});

router.put('/project/:Id', function(req,res){
  console.log('update a project');
  Project.findByIdAndUpdate(req.params.Id,
    {
      $set: {projectid: req.body.projectid, name: req.body.name}
    },
    {
      new:true
    },
    function(err, updatedproject){
      if(err){
        res.send('error updating');
      }else{
        res.json(updatedproject);
      }
    }
  );
});

router.delete('/project/:Id', function(req,res){
  Head.findOne({'headid':req.params.Id},function(err,data){
    if(err){
      console.log(err);
    }else{
      if(data){
        data.remove();
        console.log('headdata removed successfully')
      }else{
        console.log('no headdata')
      }
    }

  });
  console.log('delete');
  Project.findByIdAndRemove(req.params.Id, function(err,deletedproject){
    if(err){
      res.send('not possible');
    }else{
      res.json(deletedproject);
    }
  });
});

router.post('/head/:Id', (req, res) => {
  const newHeads = new Head({
    ppdh:req.body.field1,
    imdh:req.body.field2,
    qc:req.body.field3,
    bdh:req.body.field4,
    cc:req.body.field5,
    bac:req.body.field6,
    li:req.body.field7,
    vh:req.body.field8,
    animator:req.body.field9,
    dtpoperator:req.body.field10,
    headid:req.params.Id
  })
  newHeads.save().then(rec => {
    res.json(rec);
  }, (err) => {
    console.log(err);
    res.status(500).json({error: 'error'})
  });
});

router.get('/heads',(req,res)=>{
  Head.find({})
  .populate('headid')
  .exec()
  .then(rec => {
    res.status(200).json(rec);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.get('/head/:Id',(req,res)=>{
  Head.findOne({'headid':req.params.Id})
  .populate('headid')
  .exec()
  .then(rec => {
    res.status(200).json(rec);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

module.exports = router;
