var express = require("express");
var app     = express();
var path    = require("path");
var fs = require('fs');
let tabOfCords = [];
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
let pathToFileWithUserCords = 'userCords.json';

app.use(function (req, res, next) {
    fs.readFile(pathToFileWithUserCords, 'utf8',(err, data) => {
        if (err) throw err;
        tabOfCords=JSON.parse(data);
        //console.log(tabOfCords);
    });
    next()
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

app.post('/Location_of_Cache',(req, res) => {
    try{
        let LatCord = req.body.locationLatCord; 
        let LonCord = req.body.locationLonCord;
        let nameCord = req.body.nameofCashe;
        let descCord = req.body.descriptionfCashe;
        let cordData = 'New cashe with cords '+ ' : ' + LatCord +' ' + LonCord +' '+ nameCord;
        console.log(cordData);
        tabOfCords.push({LatCord:LatCord,LonCord:LonCord,nameCord:nameCord,descCord:descCord});
        var myJsonString = JSON.stringify(tabOfCords);
        fs.writeFile (pathToFileWithUserCords, myJsonString, (err) =>  {
            if (err) throw err;
        });
    }catch( err ) {
        console.log('Error');
    };
});

app.post('/Delete', function(req, res) {
    console.log("User deleted cord");
    
    tabOfCords.pop();
    var myJsonString = JSON.stringify(tabOfCords);
    fs.writeFile (pathToFileWithUserCords, myJsonString, (err) =>  {
            if (err) throw err;
        });
});

app.listen(3000);

console.log("Running at Port 3000");