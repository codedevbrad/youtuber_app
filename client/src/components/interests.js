import React, { Component } from 'react';
import './interests.scss';
import Error_msg from '../Error';

import Interest_artists from './interest_yt-artists';

class Interests extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      interests: [],
      interest_selected: 'none',
      interest_artists: [],
      error: null
    }
  }

  // when component first loads
  componentDidMount() {
      fetch('/api/interests')
        .then( res => res.json())
        .then(interests => this.setState( { interests }, () => {
               console.log('interests fetched ..' , interests );
            }
        ))
        .catch( err => {
          console.log( 'something failed');
          this.setState( { error: { msg: 'cannot retrieve user interests' } })
        });
  };

  // submitting a new interest
  newInterest = ( el ) => {

      if (el.key === 'Enter') {

        fetch('/api/interests', {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
            body: JSON.stringify( { name: el.target.value } )
        })
        .then ( res => res.json())
        .then ( interest => {
            const newInterest = { name: interest.name, id: interest._id }
            this.setState( { interests: [...this.state.interests, newInterest  ] });
            el.target.value = '';
        })
        .catch( err => console.log( err ));
      }
    }

  // selecting an interest
  selectInterest = ( el ) => {
      var id = el.target.getAttribute( "data-id" );

      fetch('/api/interests/artist?id='+ id ).then( response => {
          if ( response.status !== 200 ) {
            throw new Error;
          }
          return response.json()
        })
        .then( artists => {
           this.setState( { interest_selected: id  } );
           this.setState( { interest_artists:  artists } );
        })
        .catch( err => {
           this.setState(  { error: { msg: 'unable to load artists' }  } );
        })
  }


  setStateOfArtists = artist => {
      this.setState( { interest_artists: [...this.state.interest_artists, artist  ] });
  }

  render() {
    return (
        <div className="yt-interests">
          <div>
            { this.state.error !== null &&
                <div> <Error_msg error={ this.state.error }/> </div>
            }
          </div>

          <div className="special-contain">

            <section className="right-content-spaced" id="progress-files">

               <div className="content-area-popup-contain">
                 <h2 className="content-title"> your interests </h2>
                 <div className="interest_input_contain">
                    <input className="btn-design" placeholder="new interest" onKeyPress={this.newInterest.bind(this)} />
                 </div>
               </div>

               <ul id="interests_populate">
                   { this.state.interests.map( interest =>
                     <li key={ interest.id } id={ interest.sel ? 'selected' : ''}  className="each-interest" data-id={ interest._id } onClick={ this.selectInterest } >
                        { interest.name }
                     </li>
                   )}
               </ul>
            </section>

           <Interest_artists name={ this.state.name } setStateOfArtists={ this.setStateOfArtists } artist_id={ this.state.interest_selected } artists={ this.state.interest_artists } />

          </div>
        </div>
    );
  }
}

export default Interests;
