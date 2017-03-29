import React from 'react';
import {Link} from 'react-router';
import ArtistSongs from './ArtistSongs';
import ArtistAlbums from './ArtistAlbums';
import Albums from './Albums';

class Artist extends React.Component{

  componentDidMount(){
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
  }

const Artist = (props) => {

  const selectedArtist = props.selectedArtist;

  return (
    <div>
      <h3>{selectedArtist.name}</h3>
      <h4><Albums /></h4>
      <h4><ArtistSongs /></h4>
    </div>
  )
}


export default Artist;
