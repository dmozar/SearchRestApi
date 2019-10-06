import TermModel from './../models/Term';
import { MysqlHelper } from '../helper/mysql_helper';

exports.list = function(req, res) {
    var model = new TermModel();
    model.find(req).then((result)=>{ res.status(200).send( result ); MysqlHelper.close(); })
    
};

