//wydrukuj liste dodanych skrytek na stronie, wykonuje się automatycznie
(function() {
    fetch('/userCords.json')
        .then(resp => resp.json())
        .then(data => {
        for(let i = 0;i<data.length;i++){
            var node = document.createElement("LI");
            var textnode = document.createTextNode('Name of user cache : ' + data[i].nameCord + ' , ' + 'Cords of cache : latitude ' + data[i].LatCord + ' longitude ' + data[i].LonCord + ' ' + 'Description : ' + data[i].descCord);
            node.appendChild(textnode);    
            document.getElementById("ulCords").appendChild(node);
        };

    });

})()





