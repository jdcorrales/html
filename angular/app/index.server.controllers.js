var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname + "/controllers");

files.forEach(function(file) {
    var fileName = path.basename(file, '.js');

    exports[fileName] = require(__dirname + '/controllers/' + fileName);    
});