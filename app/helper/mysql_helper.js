var mysql  = require('mysql');

export const MysqlHelper = {

    conf: {
        'host':         'localhost',
        'database':     'searchclients',
        'user':         'root',
        'password':     'Dexilo2dexilo.',
        'charset':      'utf8'
    },


    connect: () => {
        return mysql.createConnection(MysqlHelper.conf);
    },

}