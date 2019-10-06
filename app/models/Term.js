import {MysqlHelper} from './../helper/mysql_helper'; 
import {UserModel} from './User'

const dotenv = require('dotenv');
dotenv.config();

export default class TermModel {


    constructor () {


    }

    create(){

    };

    delete(){

    };

    update(){

    };


    find(req){

        return new Promise((resolve)=>{

            

            if(req.query.token === undefined){

                var conn = MysqlHelper.connect();

                conn.query('SELECT * FROM terms t  WHERE t.status = 1 AND groupkey="API"', 
                    [
                        
                    ], (err, result) => {
                        
                        if(result.length){
                            resolve({status:true, items: result});
                        } else {
                            resolve({status:false})
                        }

                        
                    }
                );

                conn.end();

            }

        })
    };



}