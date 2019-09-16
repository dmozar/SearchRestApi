import {MysqlHelper} from './../helper/mysql_helper'; 

const dotenv = require('dotenv');
dotenv.config();

export default class PageModel {


    constructor () {
        
    };

    create(){

    };

    delete(){

    };

    update(){

    };


    find(req){

        return new Promise((resolve)=>{

            var conn = MysqlHelper.connect();

            if(req.query.taxonomy !== undefined){

                conn.query('SELECT * FROM terms t WHERE t.taxonomy=? AND t.status=1 LIMIT 1', 
                    [
                        req.query.taxonomy

                    ], (err, result) => {
                        if(result === undefined){
                            resolve({status:false});
                        } else {
                            if(result.length){
                                result = result[0];
                                resolve({status:true, page: result});
                            } else {
                                resolve({status:false})
                            }
                        }
                    }
                );

            }
        })
    };

}