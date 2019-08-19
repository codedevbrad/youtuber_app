
module.exports.errors = ( app ) => {
  // error 404 route
  app.use(function ( req, res, next ) {
      res.status(404).send( 'Route does not exist' );
      // render a 404 page
  });

  // error 500
  app.use( ( err , req , res , next ) => {
     console.log( 'unexecpected error: ', err );
     res.status( err.status || 500 );
     res.json( { msg : err.message, code: err.status || 500 } );
  });
}
