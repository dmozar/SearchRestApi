import PageModel from './../models/Page';
import { MysqlHelper } from '../helper/mysql_helper';

exports.find = function(req, res) {
    var model = new PageModel();
    model.find(req).then((result)=>{ res.status(200).send( result ); MysqlHelper.close(); })
    
};