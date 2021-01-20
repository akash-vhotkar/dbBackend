let generator = require('generate-password');
let nodeMailer = require ('nodemailer');

let oldmember = require('../model/oldprofile')
let member = require('../model/profile')
let login = require('../model/old/login')
let tree = require('../model/old/level')
let wallet = require('../model/old/wallet')
let statement = require('../model/old/statement')

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/dashback",{userNewUrlParser: true, useUnifiedTopology: true});

module.exports={
    // Register Old
    oldRegi:function(req,res){
        let id = req.params.id

        oldmember.findOne({'_id':id},(err,data)=>{
            if(err){
                res.json({'err':1, 'msg':'Internal server error!!!!'});
            }
            else{
                let old = data 
                let name = old.name
                let mobile = old.mobile
                let id = old.id
                let email = old.email
                let sponserName = old.sponserName
                let sponserId = old.sponserId
                
            }
        })
    },
    // fetch old
    fetchOld:function(req,res){
        oldmember.find({},(err,data)=>{
            if(err){
                res.json({'err':1, 'msg':'Internal server error!!!!'})
            }
            else{
                console.log('data:' +data)
                res.json({'err':0, 'msg':'Done', 'data':data})
            }
        })
    }
}