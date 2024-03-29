import {MysqlHelper} from './../helper/mysql_helper'; 
var jwt = require('jsonwebtoken');
var md5 = require('md5');

const dotenv = require('dotenv');
dotenv.config();

export default class UserModel {


    constructor () {

        this.salt = 'sEaarch675';

        this.id = null;

        this.email =  null;

        this.password = null;
    
        this.ip = null;
    
        this.country = {
            id: null,
            name: null,
        };
    
        this.company = {
            name: null,
            address: null,
            type: null,
        };
    
        this.req_date = null;
    
        this.app_key = null;
    
        this.group = {
            id: null,
            name: null,
        };

        this.token = null;
    };

    generatePasswordSalt(pass){
        return md5(pass+this.salt)
    }


    create(){

    };

    delete(){

    };

    update(){

    };


    find(req,res){

        return new Promise((resolve)=>{

            //var token = jwt.sign({ email: 'dmozar@gmail.com', 'id':1 }, process.env.AUTH0_SECRET);
            //console.log(md5(1145+this.salt));
            var passHash = this.generatePasswordSalt(req.query.pass);

            var conn = MysqlHelper.connect();

            if(req.query.pass !== undefined){
               
                conn.query('SELECT u.id, u.first_name, u.last_name, u.email, u.token, u.ip, u.token, c.id as country_id, c.country_code, c.country_name FROM users u LEFT JOIN countries c on c.id = u.country_id  WHERE u.email = ? AND u.password=?  AND u.status = 1 LIMIT 1', 
                    [
                        req.query.email, 
                        passHash 
                    ], (err, result) => {

                        if(result === undefined){
                            resolve({status:false});
                        } else {
                            try {
                                if(result.length){
                                    result = result[0];

                                    var session = require('express-session');
                                    session.sesApi = result.token;

                                    resolve({status:true, user: this._format_result(result)});
                                } else {
                                    resolve({status:false})
                                }
                            } catch(err){
                                resolve({status:false,error:err});
                            }
                        }

                        

                    }
                );

                
                conn.end();
            }


            if(req.query.token !== undefined){

                var conn2 = MysqlHelper.connect();

                conn2.query('SELECT u.id, u.first_name, u.last_name, u.email, u.token, u.ip, u.token, c.id as country_id, c.country_code, c.country_name FROM users u LEFT JOIN countries c on c.id = u.country_id  WHERE u.token = ? AND u.status=1 LIMIT 1', 
                    [
                        req.query.token, 
                    ], (err, result) => {
                        console.log(err, result, 'result')
                        if(result.length){
                            result = result[0];
                            resolve({status:true, user: this._format_result(result)});
                        } else {
                            resolve({status:false})
                        }

                        
                    }
                );

                conn2.end();

            }

        })
    };


    _format_result(result){
        console.log(result)
        var u = {
            id: result.id,
            email: result.email,
            country: {
                id: result.country_id,
                code: result.country_code,
                name: result.country_name
            },
            token: result.token,
            ip: result.ip
        };

        return u;

    };

}