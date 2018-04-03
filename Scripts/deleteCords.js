//Usuń skrytkę uzytkownika bezpośrednio z listy stronie, reaguje na onsubmit="return deleteUserCache();"
function deleteUserCache(){
    let indexofCashe = document.getElementById("idcashe").value;
    let lis = document.querySelectorAll('#ulCords li');
    //if(indexofCashe>lis.length) throw new Error('Invalid length.');
    for(let i=0; li=lis[i]; i++) {
        if(i==(indexofCashe-1)){
            li=lis[i];
            li.parentNode.removeChild(li);
            console.log("Cord delete");
        };
    

};
};



