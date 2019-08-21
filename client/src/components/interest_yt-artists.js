import React, { Component } from 'react';

import './interest_artists.scss';

var API_KEY = 'add key';


class Interest_artists extends Component {

    constructor() {
      super();
      this.state = {
        artistIsOpen: false,
        artistFound: false
      }
    }

    getStyle() {
      return { display: this.state.artistIsOpen ? 'block' : 'none' }
    }

    openArtist ( )  {
       if   ( this.state.artistIsOpen === false ) { this.setState( { artistIsOpen: true } ); }
       else { this.setState(  { artistIsOpen: false } ); }
    }

    newCreator = ( el ) => {

        if ( el.key === 'Enter' ) {
          // search youtube for creator
          var search       = document.getElementById('channel-name').value;
          var url          = 'https://www.youtube.com/results?search_query=';
          var channel_url  = url.concat(search.split(' ').join('+'));

          // fetch youtube data
          fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + search + '&type=channel&key=AIzaSyDbhPrYOQs79wS_Y8WOq5WCKeGJ8nQbVSA')
             .then( res => res.json())
             .then( channels => {
                const data  = channels.items[0].snippet;
                const ytObj = { name: data.channelTitle, img: data.thumbnails.medium.url, url: channel_url };
                console.log( ytObj );
                // load right hand side with found object
                this.setState( { artistFound: ytObj } );
             })
             .catch( err => console.log( 'err:', err ));
        }
    }

    submitCreator = () => {

        console.log( 'clicked element ');

        fetch('/api/interests/artist?id=' + this.props.artist_id , {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
            body: JSON.stringify( this.state.artistFound )
        })
        .then ( res => res.json())
        .then ( res => {
            console.log('new creator added ..', res );
            this.setState( { artistIsOpen: false } );
            this.props.setStateOfArtists( this.state.artistFound );
        })
        .catch( err => console.log( err ));
    }

    closeArtistPopup () {
       this.setState(  { artistIsOpen: false });
    }

  render() {

    return (

      <section className="left-content-full" >
        <section className="special-left-content">

          <div className="content-area-popup-contain">
             <h2 className="content-title"> interested artists  </h2>
             <div className="content-popup-btn btn-design"  onClick={ this.openArtist.bind(this) }> <h3> new creator </h3> </div>
          </div>

          <div className="yt_interests_popup" style={ this.getStyle() }>
                <div className="yt-artists_close-btn-contain">
                    <div classname="yt-artists_close-btn" onClick={ this.closeArtistPopup.bind(this) }> x </div>
                </div>
                <section className="yt-artists-search">
                  <h3> add a new artist of interest </h3>
                  <p> search for a youtuber you love. make sure it's related to your interest folder </p>
                  <input type="text" placeholder="channel name" name="artist_channel" className="find_artist_input" id="channel-name" onKeyPress={ this.newCreator } />
                  <button className="submit_artist btn-design"  onClick={ this.submitCreator }> yepp, that's them </button>
                </section>
                { this.state.artistFound != false &&

                  <section className="yt-artists-search-results">
                    <div className="image-contain">
                       <img className="image" alt="a youtuber" src={ this.state.artistFound.img } />
                       <div> { this.state.artistFound.name } </div>
                    </div>
                  </section>
                 }

          </div>

          <div className="yt_interests_populate">

            { this.props.artists.length === 0 &&
              <h2> you should add some artists </h2>
            }
            { this.props.artists.map( artist =>
              <div className="image-contain" data-id={ artist._id } >
                 <img className="image" alt="a youtuber" src={ artist.img } />
                 <div> { artist.name } </div>
              </div>
            )}

          </div>

        </section>
      </section>
    );
  }
}

export default Interest_artists;
