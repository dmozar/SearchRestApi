import express from 'express';
import routes from './routes';

const app = express();
var cookieParser = require('cookie-parser');



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var session = require('express-session');


app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'idiokratija',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 }
}))

// destroy session
/* req.session.destroy(function(err) {
  // cannot access session here
}) */


// middleware to use for all requests
app.use(function(req, res, next) {

      var sesApi = session.sesApi;
      console.log(sesApi + "!==" + req.query.key)
    
    if (sesApi === undefined && req._parsedUrl.pathname !== '/user/find')
    {
      res.status(400).send({
            success: 'false',
            message: 'Session is not valid!',
      });
      res.end();
    } else {
      if(req._parsedUrl.pathname !== '/user/find'){
      
        if(sesApi !== req.query.key){
          res.status(400).send({
                success: 'false',
                message: 'Session is not valid!!',
          });
          res.end();
        } else {
          console.log('Something is happening.');
          next()
        }
      } else {
        console.log('Something is happening 2.');
        next();
      }
    }
});


app.use('/',routes);






// get all todos
// app.post('/user/find', (req, res) => {
    
//   res.status(200).send({
//     success: 'true',
//     message: 'todos retrieved successfully',
//   })
// });




const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});