var fs = require('fs');
var PORT = process.env.PORT || 8080;
var options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};

var express = require("express"),
    http = require("https"), // Use HTTPs here -------------
    app = express(),
    bodyParser = require('body-parser'),
    server = http.createServer(options, app);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})
)
app.use(express.static(__dirname + '/client'));
//on Error:  Can't set headers after they are sent.
app.use(function(req,res,next){
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});






server.listen(PORT, function(){
  console.log('runnin on '+ PORT)
});

require('./Signaling-Server.js')(server);


