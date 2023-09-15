const fs = require('fs');
function adminSearch(adminData, username, password){
    var status = 0;
    for(var i = 0; i < adminData.length; i++){
        if (adminData[i].username == username && adminData[i].password == password){
            status = 1;
        }
    }
    return status;
}

module.exports = adminSearch;