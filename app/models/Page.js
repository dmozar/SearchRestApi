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

        var o = {
            "items": [
                {"title":"Configure Server","link":"/api/search/configure-server"},
                {"title":"Configure Search","link":"/api/search/configure-search"}
            ],
            "status": true,
            "options": {
                "options": {"position":"sidebar","handler":"navigation"}
            }
        }

        return new Promise((resolve)=>{

            var conn = MysqlHelper.connect();

            if(req.query.taxonomy !== undefined){

                conn.query('SELECT * FROM terms t WHERE t.taxonomy=? OR slug=? AND t.status=1 LIMIT 1', 
                    [
                        req.query.taxonomy,
                        req.query.taxonomy

                    ], (err, result) => {
                        if(result === undefined){
                            resolve({status:false});
                        } else {
                            if(result.length){
                                result = result[0];
                                this.get_children(conn,result.id).then((children)=>{
                                    result.children = children;
                                    result.options = JSON.parse(result.options);
                                    resolve({status:true, page: result});
                                })
                            } else {
                                resolve({status:false})
                            }
                        }
                    }
                );

            }
        })
    };


    get_children(conn, taxonomy_id){
        return new Promise((resolve)=>{
            if(!taxonomy_id){
                resolve(null);
            } else {
                conn.query('SELECT * FROM terms t WHERE t.parent_id = ? AND t.status=1', 
                    [
                        taxonomy_id

                    ], (err, result) => {
                        console.log(result)
                        if(result === undefined){
                            resolve([]);
                        } else {
                            if(result.length){
                                var items = [];
                                result.forEach((item)=>{
                                    try{
                                        item.options = JSON.parse(item.options);
                                        items.push(item);
                                    } catch(e){
                                        console.log(e);
                                        console.log(item.options)
                                    }
                                });
                                resolve(result);
                            } else {
                                resolve()
                            }
                        }
                    }
                );
            }
        })
               
    };

}