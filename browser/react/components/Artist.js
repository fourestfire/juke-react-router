import React from 'react';
import ArtistSongs from './ArtistSongs';
import Albums from './Albums';

class Artist extends React.Component{
/*  constructor(props){
    super(props)
  }*/

  componentDidMount(){
    const artistId = this.props.routeParams.artistId;
    const selectArtist = this.props.selectArtist;

    selectArtist(artistId);

  }

  render () {
    return (
      <div>
        <h3>{this.props.selectedArtist.name}</h3>
        <Albums />
        <ArtistSongs />
      </div>
    );
    
  }

}

export default Artist;
