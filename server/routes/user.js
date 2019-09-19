const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require("jsonwebtoken");
const session = require('express-session');
const store = require('connect-mongo')(session);
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userdata");
const Stage = require("../models/stage");
// const Project = require("../models/project");

mongoose.connect('mongodb://localhost/erp',{useNewUrlParser: true, useCreateIndex:true}, function(err){
  console.log('sahi');
  if(err){
    console.error('Error' + err);
  }
});


router.get('/all',function(req,res) {
  console.log('get all users');
  User.find({})
  .exec(function(err,users){
    if(err){
      console.log(err)
    }else{
      res.json(users);
    }
  });
});


router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log('this email already exists');
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log('yaha pe');
            console.error('error', err);
            return res.status(500).json({
              error: err
            });
          } else {
            console.log(req.body);
            const user = new User({
              // _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              // notify:{
              //   content: req.body.notify.content,
              //   approval:req.body.notify.approval
              // }
            });
            user
              .save()
              .then(result => {
                console.log(result);
                console.log('data added');
              })
              .catch(err => {
                console.error(err);
              });
          }
        });
      }
    });
});

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    // console.log(req.headers);
    if(typeof header !== 'undefined') {
        const bearer = header.split('.');
        const token = bearer[1];
        console.log(token);
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        console.log('user does not exist');
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          console.log(result);
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id

            },
            '123456',
            // process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            idtoken: token,
            expiresIn: '3600'
          });
        }else{
          console.log('nahi hua');
          res.status(401).json({
            message: "Auth failed"
          });
        }

      });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/info', (req,res)=>{
  var x = req.headers['authorization'];
  jwt.verify(x,'123456',function(err,decoded){
    if(err){
      console.log(err)
    }else{
      User.findOne({"_id":decoded.userId})
      .exec(function(err,data){
        if(err){
          console.log('data not found',err)
        }else{
          return res.json(data);
        }
      })
      // res.json(decoded);
    }
  })
});

router.post('/notify',(req,res)=>{

  User.findOne({"name":req.body.name},function(err,data){
    data.notify.push({content:req.body.content,approval:false});
    data.save(function(err){
      if(err){
        console.log(err)
      }else{
        console.log('success');
        res.json(data);
      }
    })
  })
});

router.get('/notifyadmin',(req,res)=>{
  User.findOne({"name":"tushar"},function(err,data){
    data.notify.push({content:'Delay in stage completion',approval:false});
    data.save(function(err){
      if(err){
        console.log(err)
      }else{
        console.log(data,'notified');
        // res.json(data);
      }
    })
  })
});

router.post('/appr',(req,res)=>{
  console.log(req.body);
  Stage.findOne({'projid':req.body.id},function(err,doc){
    for(var i=0;i<doc.stages[parseInt(req.body.s)-1].authority.length;i++){
      User.findOne({"name":doc.stages[parseInt(req.body.s)-1].authority[i]},function(err,data){
        data.notify.push({content:'Approval request for stage '+req.body.s,approval:false,proid:req.body.id});
        data.save(function(err){
          if(err){
            console.log(err)
          }else{
            console.log('sent')
          }
        })
      })
    }
  })
});




module.exports = router;
