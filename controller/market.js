let market = require('../../modeldash/market');

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/dashback",{userNewUrlParser: true});

module.exports={
    addMarket:function(res,req){
        let name = req.body.name
        let mobile = req.body.mob
        let position = 'marketing'
        let Password = '12345'
        let ins = new market({'name':name,'mobile':mobile,'position':position,'pass':pass});
        ins.save((err)=>{
                
        })
    }
    
}