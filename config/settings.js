const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');

module.exports = {
    frontEnd_Static: function( app , dirname ) {

      // initialize any template build tools
      app.use('/front-end', express.static(path.join(dirname, 'static_render/')));
    },

    template: function ( app , dirname )  {

      // bring in pug
      app.set('views', path.join( dirname, 'static_render/'));
      app.set('view engine', 'pug');
    },

    middleware: function ( app ) {
      // body parser middleware
      app.use(bodyParser.urlencoded({ extended: true }))
      // parse application/json
      app.use(bodyParser.json());
    }
}
