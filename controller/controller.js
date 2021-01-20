// let ifsc = require('ifsc');
let generator = require('generate-password');
let nodeMailer = require ('nodemailer');

let levelCont = require('./level');

let oldmember = require('../model/oldprofile')
let member = require('../model/profile')
let login = require('../model/login')
let tree = require('../model/level')
let wallet = require('../model/wallet')
let admin = require('../model/admin')
let statement = require('../model/statement')
let session = require('../model/session')
let querry = require('../model/query')
let callQuerry = require('../model/callquery')

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/dashback",{userNewUrlParser: true, useUnifiedTopology: true});

module.exports={
    //  Add Members
    addMembers:function(req,res){
        var name = req.body.name
        let Mobile = req.body.mobile 
        var Femail = req.body.email
        var email = Femail.toLowerCase()
        var sponserId = req.body.sponserId
        var sponserName = req.body.sponserName
        let aadhar = req.body.aadhar
        var pan = req.body.pan
        var today = new Date();
        let password = generator.generate({
            length: 5,
            numbers: true
        });
        admin.findOne({'username':'id'},(err,data)=>{
            if(err) throw err
            else{
                let id = data.id + 1;
                let fid = 'DB' + id
                console.log('ID',fid)
                member.findOne({'mobile':Mobile},(err,data1)=>{
                    if(err)throw err
                    else if(!data1 || data1.length == 0){
                        console.log('mobile dn')
                        member.findOne({'email':email},(err,data2)=>{
                            if(err) throw err
                            else if (!data2 || data2.length == 0){
                                console.log('email dn')
                                member.findOne({'id':sponserId},(err,data3)=>{
                                    if(err) throw err
                                    else{
                                        let ancestors = data3.ancestors
                                        console.log('ancestors',ancestors);
                                        let ins = new member({'name':name,'mobile':Mobile,'id':fid,'email':email,'sponserId':sponserId,
                                        'sponserName':sponserName,'ancestors':ancestors,'aadharNo':aadhar,'panNo':pan,'joiningDate':today})
                                        ins.save((err,data4)=>{
                                            if(err) throw err
                                            else{
                                                
                                                let ins = new login({'name':name,'mobile':Mobile,'id':fid,'email':email,'password':password})
                                                ins.save((err)=>{
                                                    if(err) throw err
                                                    console.log('login dn')
                                                    this.Newmail(email,password,name,fid);
                                                })
                                                let ins1 = new wallet({'name':name,'mobile':Mobile,'id':fid})
                                                ins1.save((err)=>{
                                                    if(err) throw err
                                                    console.log('wallet dn')
                                                })
                                                let ins2 = new tree({'mobile':Mobile,'id':fid,'name':name})
                                                ins2.save((err)=>{
                                                    if(err) throw err
                                                    else{
                                                        console.log('level dn')
                                                        levelCont.activate(sponserId,Mobile);
                                                        this.id(id,fid);
                                                    }
                                                })
                                                member.updateOne({'id':sponserId},{$inc:{'direct':+1,'lvlNo':+1}},(err)=>{
                                                    if(err) throw err
                                                    else{
                                                        console.log('inc dn')
                                                        member.updateOne({'id':fid},{$addToSet:{'ancestors':[sponserId]}},(err)=>{
                                                            if(err) throw err
                                                            else{
                                                                res.json({'err':0,'msg':'Registered Successfully. You will recieve Login Id and password through Mail within 5 mins.',data4})
                                                                console.log('set dn')
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            else{
                                console.log('email fail')
                                res.json({'err':1,'msg':'Email Id elready exists'})
                            }
                        })
                    }
                    else{
                        console.log('mobile fail')
                        res.json({'err':1,'msg':'Mobile no. already exists'})
                    }
                })
            }
        })
    },
    //   Login 
    login:function(req,res){
        let mobile = req.body.mobile
        var pass = req.body.password
        login.findOne({'id':mobile,'password':pass},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){
                res.json({'err':1,'msg':'Invalid userId Or password'});
            }
            else{
                session.findOne({'userId':mobile},(err,data1)=>{
                    if(err) throw err
                    else if(!data1 || data1.length == 0){
                        let ins = new session({'userId':mobile,'time':30,'on':'true'});
                        ins.save((err)=>{
                            if(err) throw err
                            else{
                                res.json({'err':0,'msg':'Login Successfull',data});
                            }
                        })
                    }
                    else{
                        session.deleteOne({'userId':mobile},(err)=>{
                            if(err) throw err
                            else{
                                let ins = new session({'userId':mobile,'time':30,'Son':'true'});
                                ins.save((err)=>{
                                    if(err) throw err
                                    else{
                                        res.json({'err':0,'msg':'Login Successfull',data});
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    //   Cron session
    cronSession:function(){
        console.log('cron session');
        session.updateMany({},{$inc: {'time':-1}},(err)=>{
            if(err) throw err
            else{
                session.deleteMany({'time':0},(err)=>{
                    if(err) throw err
                })
            }
        })
    },
    // fetch session
    fetchSession:function(req,res){
        let id = req.params.mobile
        session.findOne({'userId':id},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){
                res.json({'err':1,'msg':'session ended'});
            }
            else if(data.time <= 0){
                res.json({'err':2,'msg':'session ended'});
            }
            else if(data.time > 0){
                res.json({'err':0,'msg':'session exists'})
            }
        })
    },
    //  fetch Direct
    fetchDirect:function(req,res){
        let sponserId = req.params.sponser
        member.find({'sponserId':sponserId},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){
                res.json({'err':1,'msg':'no data'})
            }
            else{
                res.json(data);
            }
        })
    },
    //   fetch  Name
    fetchName:function(req,res){
        let mobile = req.params.mobile
        member.findOne({'id':mobile},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    //  Regist Fetch
    regi:function(req,res){
        let id = req.params.mobile
        if(id == null){
             res.json({})
             console.log('none')
        }
        else{
            member.findOne({'id':id},(err,data)=>{
                if(err) throw err
                else if(!data || data == null){
                    res.json({'err':1,'msg':'Not Data'})
                }
                else{
                    res.json(data);
                }
            })
        }
    },
    //fetch welcome call list
    welCall:function(req,res){
        member.find({'welCall':false,'int':true},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    // account opening list
    accList:function(req,res){
        member.find({'welCall':true},(err,data)=>{
            if(err) throw err
            // else if(!data || data.length==0){
            //     res.json({'err':0, 'msg':'Data does not exists'});
            // }
            else{
                res.json(data);
            }
        })
    },
    // search by mobile
    sMobile:function(req,res){
        let mobile = req.params.mobile
        member.findOne({'mobile':mobile},(err,data)=>{
            if(err) throw err
            else if(!data ||  data.length == 0){
                res.json({'err':1,'msg' :'Mobile no. does not exists'})
            }
            else{
                res.json({'err':0,data});
            }
        })
    },
    // raise query
    query:function(req,res){
        let 
    },
    // regenrate password
    genPass:function(req,res){
        let id = req.params.id
        login.findOne({'id':id},(err,data)=>{
            if(err) throw err
            else{
                console.log(data);
                let pass = data.password
                let name = data.name
                let email = data.email
                this.Newmail(email,pass,name,id);
                res.json({'err':0,'msg':'mail sent'})
            }
        })
    },
    // fetch Balance
    fetchBal:function(req,res){
        let id = req.params.mobile
        wallet.findOne({'id':id},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    //      Fetch Team
    fetchTeam:function(req,res){
        let mobile = req.params.mobile
        member.find({'ancestors':mobile},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    //skip
    skip:function(req,res){
        let no = req.body.no
        let sno = parseInt(no)
        admin.findOne({'username':'id'},(err,data)=>{
            if(err) throw err
            else{
                let Id = data.id + sno
                console.log(Id)
                let fid = 'DB'+Id
                admin.updateOne({'username':'id'}, {'id':Id,'fid':fid},(err)=>{
                    if(err) throw err
                    else{
                        res.json({'err':0, 'msg':'Successfully Skipped Last ID is' + fid})
                    }
                })
            }
        })
    },
     //call query
     call:function(req,res){
        let id = req.body.id
        let name = req.body.name
        let email = req.body.email
        let mobile = req.body.mobile
        let language = req.body.language
        let mailR = req.body.mailR
        let login = req.body.login
        let platform = req.body.platform
        let queryT = req.body.queryT
        let query = req.body.query
        let referF = req.body.referF
        let ins = new callQuerry({'userId':id,'name':name,'email':email,'mobile':mobile,'language':language,'mailR':mailR,
        'login':login,'platform':platform,'queryT':queryT,'query':query,'referF':referF});
        ins.save((err)=>{
            if(err) throw err
            else{
                member.updateOne({'id':id},{'welCall':true},(err)=>{
                    if(err) throw err
                })
                res.json({'err':0,'msg':'added successfully'});
            }
        })
    },
    
    //    Admin  Login
    adminLog:function(req,res){
        let username = req.body.username
        let password = req.body.pass

        admin.findOne({'username': username, 'password':password},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){
                res.json({'err':1,'msg':'Login Failed Invaild Username Or Password'})
            }
            else{
                res.json({'err':0,'msg':'Longin Successfull'})
            }
        })
    },
    //  Fetch Member
    fetchMember:function(req,res){
        member.find({'status':'inactive'},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    //  Delete Member
    deleteMem:function(req,res){
        id = req.params.Id
        member.deleteOne({'_id':id},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){
                res.json({'err':1,'msg':'No Data'})
            }
            else{
                console.log(data);
                res.json({'err':0,'msg':'Deleted Successfully'})
            }
        })
    },
    // fetch Active
    fetchactive:function(req,res){
        member.find({'status':'active'},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    // month id
    Mid:function(){
        console.log('working')
        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let bid = '20'+ mm +0+0+0+0+1
        let id = parseInt(bid);
        let fid = 'DB'+id
    //    let ins = new admin({'username':'id','id':id,'fid':fid})
    //    ins.save((err)=>{
    //        if(err) throw err
    //    })
        admin.updateOne({'username':'id'},{'id':id,'fid':fid},(err)=>{
            if(err) throw err
        })
    },
    id:function(n,f){
        let ide = n
        let fid = f
        admin.updateOne({'username':'id'},{'id':ide,'fid':fid},(err)=>{
            if(err) throw err
        })
    },
    // New Member Mailer
    Newmail(email,password,name,id){
        console.log(email,password,name,id)
        let transporter = nodeMailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: 'services@dashback.in',
                pass: '#@nm0l1998'
            }
        });
        let mailOptions = {
            from: '"Dash Back" <services@dashback.in>',
            to: email,
            subject: name+' welecome To Dash Back',
            text: '',
            html: '<p>'+name+ ' you are welcomed to Dash Back. <br> To login <a herf="dashback.in/login">click here</a> or the link below <br> http://dashback.in/login <br> your user id is <b>'+
                    id+'</b> and password is <b>'+password+'</b><br>For any kind of Enquiry call: +91 9999509088</p>'
        };

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                return console.log(error)
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        
        });
            console.log("Done");
    },
    cronJob:function(){
        member.updateMany({},{'welCall':'false'},(err)=>{
            if(err) throw err
        })
    },
    change:function(){
        member.updateOne({'_id':'5e32ce04ae90f75af6b3030d'},{'id':'DB200100205'},(err)=>{
            if(err) throw err
            else{
              tree.updateOne({"_id":"5e19b1a382644c5a6104b912"},{"lvl1":["200100159","200100205"]},(err)=>{
                  if(err) throw err
                  else{
                    tree.updateOne({"_id":"5e14f819634945797e8897db"},{"lvl2":["200100036","200100159","200100205"]},(err)=>{
                        if(err) throw err
                        else{
                            tree.updateOne({"_id":"5e0de654da1c7415972c1451"},{"lvl3":["200100036","200100159","200100205"]},(err)=>{
                                if(err) throw err
                                else{
                                    tree.updateOne({"_id":"5e0cf2706736b715626b21f0"},{"lvl4":["200100036","200100159","200100205"]},(err)=>{
                                        if(err) throw err
                                        else{
                                            tree.updateOne({"_id":"5e0cf1704f44301543ec1777"},{"lvl5":["200100036","200100159","200100205"]},(err)=>{
                                                if(err) throw err 
                                                else{
                                                    tree.updateOne({"_id":"5e0cf08a78e1f114dc55b10b"},{"lvl6":["200100036","200100159","200100205"]},(err)=>{
                                                        if(err) throw err 
                                                        else{
                                                            tree.updateOne({"_id":"5e0cef6f55c16a12442ab724"},{"lvl7":["200100036","200100159","200100205"]},(err)=>{
                                                                if(err) throw err 
                                                                else{
                                                                    tree.updateOne({"_id":"5e0ced20c3217e0aea95229d"},{"lvl8":["200100036","200100159","200100205"]},(err)=>{
                                                                        if(err) throw err 
                                                                        else{
                                                                            member.updateOne({'_id':'5e32ce04ae90f75af6b3030d'},{$addToSet:{'ancestors':"DB200100013"}},(err)=>{
                                                                                if(err) throw err
                                                                                else{
                                                                                    wallet.updateOne({'id':'DB2001000013'},{$inc:{'walletBal':-270}},(err)=>{
                                                                                        if(err) throw err
                                                                                        else{
                                                                                            member.updateOne({"_id":"5e0cef6f55c16a12442ab721"},{"ancestors":["ansectors","DB200100001"]},(err)=>{
                                                                                                if(err) throw err
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })  
                                                        }
                                                    })  
                                                }
                                            })    
                                        }
                                    })
                                }
                            })
                        }
                    })
                  }
              })  
            }
        })
    },
    int:function(req,res){
        let mob = req.params.mob
        member.updateOne({'mobile':mob},{'int':'false'},(err)=>{
            if(err) throw err
            else{
                res.json({'err':0,'msg':'Done'});
            }
        })
    },
    up:function(){
        member.updateMany({},{'int':'true'},(err)=>{
            if(err) throw err
            else{
                console.log('updated')
            }
        })
    },
    fetchPass:function(req,res){
        login.find({},(err,data)=>{
            if(err) throw err
            else{
                res.json(data);
            }
        })
    },
    //Update Pass
    updatePass:function(req,res){
        // let old = req.body.
        // login.find
    },
    //fetch level
    fetchLevel:function(req,res){
        let id = req.params.id
        tree.findOne({'id':id},(err,data)=>{
            if(err){
                res.json({'err':1,'msg':'internal server error.'})
                throw err
            }
            else{
                res.json({'err':0, 'msg':'done',data})
            }
        })
    },
    fetchStatement:function(req,res){
        let id = req.params.id
        statement.find({'id':id},(err,data)=>{
            if(err){
                res.json({'err':1,'msg':'Internal server error'})
                throw err
            }
            else{
                res.json({'err':0, 'msg':'done',data})
            }
        })
    },
    fetchAll:function(req,res){
        member.find({},(err,data)=>{
            if(err){
                res.json({'err':1,'msg':'Internal Server Error'})
            }
            else{
                res.json({'err':0, 'msg':'Done',data
            })
            }
        })
    },
    addFirst:function(req,res){
        let name = req.body.name
        let mobile = req.body.mob
        let email = req.body.email
        let sponserName = req.body.sponserName
        let sponserId = req.body.sponserId

        
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