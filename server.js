
const express  = require('express');
const path     = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
// initalise app
const app    = express();
const server = require('http').createServer(app);
const port   = 5000;

// initialise any middleware / front-end
var config = require('./config/settings.js');
config.middleware( app );

// connect to mblabs
mongoose
  .connect( process.env.DATABASE_ATLAS , { useNewUrlParser: true } )
  .then(   () => console.log('mongodb Connected'))
  .catch( err => console.log( err ));

app.use( session (
  { secret: "iamasecretbrad2020@-/brad£$$goaway", resave: false }
));

// api route ( main app)
app.use('/api', require('./web/route'));

// error middleware
catchError = require('./errors').errors( app );


// start server ...
server.listen(process.env.PORT || port, ( req, res ) => { console.log('server started');
});
