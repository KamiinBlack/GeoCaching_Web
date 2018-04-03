let map;

function initMap() {
        const centerOfMapPos = {lat: 39.299236, lng: -76.609383};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: centerOfMapPos
    });
    
    getRandomPostionForCashe().then((data) => {
        for(let i = 0;i<data.length;i++){
            let ab = data[i].location.latitude;
            let bb = data[i].location.longitude;
            let nameofCashe = data[i].road;
            newMarker= new google.maps.LatLng(ab, bb);
            addMarker(newMarker,nameofCashe);
        }  
    }); 
    
    getUserPostionForCashe().then((data) => {
        for(let i = 0;i<data.length;i++){
            let ab = data[i].LatCord
            let bb = data[i].LonCord;
            let nameofCashe = data[i].nameCord;
            newMarker= new google.maps.LatLng(ab, bb);
            addMarker(newMarker,nameofCashe);
        }  
    });    
};

function getRandomPostionForCashe(){
    return new Promise((resolve,reject) => {
    fetch('https://opendata.howardcountymd.gov/resource/96q9-qbh7.json')
        .then(res => res.json())
        .then(data => {
        let location = [];
        for(let i = 0;i<data.length;i++){
        location.push(data[i]);
        resolve(location);
        };});
}); };

function getUserPostionForCashe(){
    return new Promise((resolve,reject) => {
    fetch('/userCords.json')
        .then(res => res.json())
        .then(data => {
        let location = [];
        for(let i = 0;i<data.length;i++){
        location.push(data[i]);
        resolve(location);
        };
        
        });});
};

function addMarker(location,name) {
        marker = new google.maps.Marker({
            position: location,
            map: map,
            title:name
        });
};

function userCache(){
        var locationLatCord = document.getElementById("lat").value;
        var locationLonCord = document.getElementById("lon").value;
        var nameofCashe = document.getElementById("cashe").value;;
        
        newMarker= new google.maps.LatLng(locationLatCord, locationLonCord);
        addMarker(newMarker,nameofCashe);
};
    