
const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const request  = require('request');

// interest & artist models
const Interests = require('./interest');

// practising session / auth
router.get('/user_auth', ( req, res ) => {
  req.session.user = { id: '12345', username: "brad" };
  return req.session.user;
});

// crud data
router.route('/interests')
  .get( ( req , res , next ) => {
      // throw new Error( 'an error outside of .catch');
      Interests.find( { } )
         .then ( result => { res.status(200).send( result ) })
         .catch( next );
  })

  .post( ( req , res , next ) => {
      console.log('hello', req.body.name );

      const newObj = new Interests( { name: req.body.name , data: []  });

      if ( !req.body || !req.body.name ) { throw new Error( 'missing fields' ); }

      newObj.save()
        .then ( item => { res.status(200).send( item ); })
        .catch( next );
  })

  .delete( ( req, res, next ) => {
     Interests.findByIdAndRemove( { _id: req.query.id } )
       .then ( res.status(200).send( { res: 'deleted object' } ) )
       .catch( next );
  });

router.route('/interests/artist')

   .get( ( req, res , next ) =>  {
      var id = req.query.id;

      Interests.findById( { _id : id } )
         .then( interest_obj => {
            var data = interest_obj.data;
            res.status(200).send( data );
          })
         .catch( next );
   })
   .post( ( req , res , next ) => {

       var id  = req.query.id;
       var obj = { interest_id: id, name: req.body.name , url: req.body.url, img: req.body.img };

       Interests.findByIdAndUpdate( { _id : id }, { $push: { data: obj } }, { new: true })
          .then( object => {
             res.status(200).send( object );
           })
          .catch( next );
   })
   .delete( ( req, res, next ) => {

        var id = req.query.id;
   });

module.exports = router;
