
// Set up the express app
const routes = require('express').Router();


import user_controller from './app/controller/user_controller';
import term_controller from './app/controller/term_controller';




routes.route('/user/find')
.get(user_controller.find)
.post(user_controller.insert)
.delete(user_controller.delete)
.put(user_controller.update);




routes.route('/term/api')
.get(term_controller.list);


    





module.exports = routes;