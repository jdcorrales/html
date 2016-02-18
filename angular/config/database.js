/**
 *  Default database configuration file
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 *
 *  docs: https://github.com/biggora/caminte/wiki/Connecting-to-DB#connecting
 **/

module.exports.production = {
    driver     : 'mysql',
    host       : 'localhost',
    port       : '3306',
    username   : 'root',
    password   : 'jdcorralesadmin',
    database   : 'project_manager',
    autoReconnect : true
};

module.exports.development = {
    driver     : 'mysql',
    host       : 'localhost',
    port       : '3306',
    username   : 'root',
    password   : 'jdcorralesadmin',
    database   : 'project_manager',
    autoReconnect : true
};

module.exports.test = {
    driver     : 'mysql',
    host       : 'localhost',
    port       : '3306',
    username   : 'root',
    password   : 'jdcorralesadmin',
    database   : 'project_manager',
    autoReconnect : true
};

module.exports.dev = module.exports.development;