import PageModel from './../models/Page';

exports.find = function(req, res) {
    var model = new PageModel();
    model.find(req).then((result)=>{ res.status(200).send( result ); })
    
};