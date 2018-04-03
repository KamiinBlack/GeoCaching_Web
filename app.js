var express = require("express");
var app     = express();
var path    = require("path");
var fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let tabOfCords = [];
let pathToFileWithUserCords = 'userCords.json';
fs.readFile(pathToFileWithUserCords, 'utf8', function (err, data) {
    if (err) throw err;
    tabOfCords=JSON.parse(data);
       //console.log(tabOfCords);
});

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/Scripts'));
app.use(express.static(__dirname + '/View'));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/View'+'/index.html'));
});

app.get('/Location_of_Cache',function(req,res){
  res.sendFile(path.join(__dirname+'/View'+'/location.html'));    
});

app.get('/Add_your_Cache', function(req, res) {
    res.sendFile(path.join(__dirname+'/View'+'/cords.html'));
});

app.get('/userCords.json', function(req, res) {
    res.sendFile(path.join(__dirname+'/userCords.json'));
});

app.post('/Location_of_Cache', function(req, res) {
    var LatCord = req.body.locationLatCord;
    var LonCord = req.body.locationLonCord;
    var nameCord = req.body.nameofCashe;
    var cordData = 'New cashe with cords '+ ' : ' + LatCord +' ' + LonCord +' '+ nameCord;
    console.log(cordData);
    tabOfCords.push({LatCord:LatCord,LonCord:LonCord,nameCord:nameCord});
    var myJsonString = JSON.stringify(tabOfCords);
        //console.log(tabOfCords);
    fs.writeFile (pathToFileWithUserCords, myJsonString, function(err)  {
                if (err) throw err;
            });
});

app.listen(3000);

console.log("Running at Port 3000");