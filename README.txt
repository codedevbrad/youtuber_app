
what to do

- implement bulma responsive layout to my artists making a row of 3 , 2 , 1 .


- learn function components and how to add them into main components .

- i need to learn how to have a grandchild change the state of the first component.
    - parent
      - child
        - grandchild

- add mountErrorTo function to my interests component
- can a child > child component pass data back to the original parent ?
   - parent state > child > child
     - child pushes data back to parent > parent pushes back to its own parent ?

- or should I just add the error component to all components that need it ?

- make getting an interest artists a get request instead .

- make an error component and show it when any error happens from an ajax catch request

 - when new artist is posted , the state of interests change so that the latest interests
   gets moved to the bottom .
     - show interests by alphabetic order or date of creation / change

- fix new artist popup and give it a nicer position and UI .

- add pagination to artists so that 7 artists are shown at any time .


done

 - change state for interest artists so that posted new artists are updated
   straight away .
 - when new artist is posted, hide the popup box .


    // .post ( ( req , res , next ) => {
    //
    //     var term = req.body.name.split(' ').join('%20');
    //     // cheerio scrape request
    //     request('https://socialblade.com/youtube/', (error, response, html) => {
    //         if (error && response.statusCode == 500) { console.log( err ); }
    //         var $ = cheerio.load( html );
    //         console.log( html );
    //         res.status( 200 ).send( { term: term } );
    //     });
    // })
