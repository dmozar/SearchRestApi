import TermModel from './../models/Term';

exports.list = function(req, res) {
    var model = new TermModel();
    model.find(req).then((result)=>{ res.status(200).send( result ); })
    
};

