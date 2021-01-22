let express = require('express');
let bodyparser = require('body-parser');
var cron = require('node-cron')
let cors = require('cors');
let http = require('http');
const mongoose = require('mongoose')
let app = express();
app.use(express.static(__dirname + ''))
const server = http.createServer(app);
app.use(cors());
app.use(bodyparser.json());
mongoose.connect("mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/project1?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("database connected");
}).catch(err => {
    console.log(err);
})

// cron.schedule('* * * * *', () => {
//     var conn = require('./controller/controller');
//     conn.cronSession();
//   });
//   cron.schedule('36 11 * * *', () => {
//     var conn = require('./controller/controller');
//     conn.change();
//   });
//  Add Member
////////         Dash Back
// cron.schedule('06 13 * * *', () => {
//     var conn = require('./controller/controller');
//     conn.up();
//   });
app.get('/', (req, res) => {
    res.send('Beaware of were you are stepping!!!');
})
app.post('/register', (req, res) => {
    var conn = require('./controller/controller');
    conn.register(req, res);

})
//  Add Member
app.post('/addMemberDash', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.addMembers(req, res);
})
//    Login
app.post('/loginDash', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.login(req, res);
})
// fetch Direct
app.get('/fetchDirectDash/:sponser', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.fetchDirect(req, res);
})
//     Fetch Name
app.get('/fetchNameDash/:mobile', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.fetchName(req, res);
})
//      Fetch Team
app.get('/fetchTeamDash/:mobile', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.fetchTeam(req, res);
})
//  Fetch Member
app.get('/fetchMemberDash', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.fetchMember(req, res);
})
//   Activate
app.post('/activateDash', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.activate(req, res);
})
//   Delete Member
app.get('/deleteMemDash/:Id', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.deleteMem(req, res);
}),
    app.get('/fetchActiveDash', (req, res, next) => {
        var conn = require('./controller/controller');
        conn.fetchactive(req, res);
    })
// payout
app.post('/payout', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.payout(req, res);
})
// create id
app.post('/createDash', (req, res, next) => {
    var conn = require('./controller/controller');
    conn.creatid(req, res);
})
// register
app.get('/regiDash/:mobile', (req, res) => {
    var conn = require('./controller/controller');
    conn.regi(req, res);
})
// fetch Balance
app.get('/fetchBal/:mobile', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchBal(req, res)
})
// fetch session
app.get('/fetchSes/:mobile', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchSession(req, res);
})
// call query
app.post('/call', (req, res) => {
    var conn = require('./controller/controller');
    conn.call(req, res);
})
// wel Call List 
app.get('/callList', (req, res) => {
    var conn = require('./controller/controller');
    conn.welCall(req, res);
})
// account opening List 
app.get('/accList', (req, res) => {
    var conn = require('./controller/controller');
    conn.accList(req, res);
})
// search by mobile
app.get('/mobile/:mobile', (req, res) => {
    var conn = require('./controller/controller');
    conn.sMobile(req, res);
})
// raise query
app.post('/query', (req, res) => {
    var conn = require('./controller/controller');
})
// regenrate password
app.get('/genPass/:id', (req, res) => {
    var conn = require('./controller/controller');
    conn.genPass(req, res);
})
//  update form
app.post('/updateForm', (req, res) => {
    var conn = require('./controller/dashback/upload');
    conn.uploadForm(req, res);
})
//    Skip
app.post('/skip', (req, res) => {
    var conn = require('./controller/controller');
    conn.skip(req, res);
})
//     intereset
app.get('/int/:mob', (req, res) => {
    var conn = require('./controller/controller');
    conn.int(req, res);
})
//fetch Pass
app.get('/fetchPass', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchPass(req, res);
})
//Update Pass
app.post('/updatePass', (req, res) => {
    var conn = require('./controller/controller');
})
//fetch Level
app.get('/fetchLevel/:id', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchLevel(req, res)
})
//fetchStatement
app.get('/fetchStatement/:id', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchStatement(req, res);
})
app.get('/fetchAll', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchAll(req, res);
})
//fetch old
app.get('/fetchOld', (req, res) => {
    var conn = require('./controller/controller');
    conn.fetchOld(req, res)
})
const port = process.env.PORT || 2000;
server.listen(port, () => {
    console.log("Running at port 1234")
})