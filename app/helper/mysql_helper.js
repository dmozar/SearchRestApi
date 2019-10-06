var mysql  = require('mysql');


let opened_connection = null;

export const MysqlHelper = {

    conf: {
        'host':         'localhost',
        'database':     'searchclients',
        'user':         'root',
        'password':     '',
        'charset':      'utf8'
    },


    connect: () => {
        return mysql.createConnection(MysqlHelper.conf);
    },

    close: () => {
        if(opened_connection){
            opened_connection.end();
        }
    }

}