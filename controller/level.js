let generator = require('generate-password');
let nodeMailer = require ('nodemailer');

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
mongoose.connect("mongodb://localhost/dashback");

module.exports={
    //      Level 1 active
    activate:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl1':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl1sum':+300}})
                        this.lvl2(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+300,'directIncome':+300,'levelIncome':+300,
                                'currentBal':+300,'totalearning':+300,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Direct Income','amt':300,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 2 active
    lvl2:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl2':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl2sum':+65}})
                        this.lvl3(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+65,'levelIncome':+65,
                                'currentBal':+65,'totalearning':+65,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 2 Income','amt':65,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 3 active
    lvl3:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl3':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl3sum':+50}})
                        this.lvl4(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+50,'totalearning':+50,'levelIncome':+50,
                                'currentBal':+50,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 3 Income','amt':50,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 4 active
    lvl4:function(id,d){ 
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl4':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl4sum':+40}})
                        this.lvl5(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+40,'totalearning':+40,'levelIncome':+40,
                                'currentBal':+40,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 4 Income','amt':40,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 5 active
    lvl5:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl5':mid}},(err)=>{
                    if(err) throw err
                    else if(!data || data.length == 0){}
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl5sum':+30}})
                        this.lvl6(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+30,'totalearning':+30,'levelIncome':+30,
                                'currentBal':+30,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 5 Income','amt':30,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 6 active
    lvl6:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl6':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl6sum':+25}})
                        this.lvl7(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+25,'totalearning':+25,'levelIncome':+25,
                                'currentBal':+25,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 6 Income','amt':25,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 7 active
    lvl7:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl7':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl7sum':+20}})
                        this.lvl8(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+20,'totalearning':+20,'levelIncome':+20,
                                'currentBal':+20,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 7 Income','amt':20,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 8 active
    lvl8:function(id,d){        
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl8':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl8sum':+20}})
                        this.lvl9(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+20,'totalearning':+20,'levelIncome':+20,
                                'currentBal':+20,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 8 Income','amt':20,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 9 active
    lvl9:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl9':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl9sum':+15}})
                        this.lvl10(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+15,'totalearning':+15,'levelIncome':+15,
                                'currentBal':+15,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 9 Income','amt':15,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 10 active
    lvl10:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl10':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl10sum':+15}})
                        this.lvl11(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+15,'totalearning':+15,'levelIncome':+15,
                                'currentBal':+15,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 10 Income','amt':15,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 11 active
    lvl11:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl11':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl11sum':+10}})
                        this.lvl12(sponser,mid)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+10,'totalearning':+10,'levelIncome':+10,
                                'currentBal':+10,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 11 Income','amt':10,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
    //          Level 12 active
    lvl12:function(id,d){
        let sid = id
        let mid = d
        member.findOne({'id':sid},(err,data)=>{
            if(err) throw err
            else if(!data || data.length == 0){}
            else{
                let sponser = data.sponserId
                let mobile = data.mobile
                let name = data.name
                tree.updateOne({'id':sid},{$addToSet: {'lvl12':mid}},(err)=>{
                    if(err) throw err
                    else{
                        tree.updateOne({'id':sid},{$inc: {'lvl12sum':+10}})
                        // this.lvl3(sponser)
                        wallet.findOne({'id':sid},(err,data1)=>{
                            if(err) throw err
                            else{
                                let last = data1.walletBal
                                wallet.updateOne({'id':id},{$inc: {'walletBal':+10,'totalearning':+10,'levelIncome':+10,
                                'currentBal':+10,'lastBal':last}},(err)=>{
                                    if(err) throw err
                                    else{
                                        let ins = new statement({'name':name,'mobile':mobile,'id':sid,'tranT':'Credit',
                                        'remark':'Level 12 Income','amt':10,'sponserId':sponser,'lastBal':last})
                                        ins.save((err)=>{
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
    },
}