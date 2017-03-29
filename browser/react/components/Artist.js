import React from 'react';
import Albums from './Albums';
import Songs from './Songs';
import {Link} from 'react-router';

class Artist extends React.Component{

  componentDidMount(){
    const artistId = this.props.routeParams.artistId;
    const selectArtist = this.props.selectArtist;
    selectArtist(artistId);
  }

  render () {
    return (
    <div>
      <h3>{ this.props.selectedArtist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${this.props.selectedArtist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${this.props.selectedArtist.id}/songs`}>SONGS</Link></li>
        </ul>
      { this.props.children && React.cloneElement(this.props.children, {
        albums: this.props.albums,
        selectAlbum: this.props.selectAlbum,

        // for songs
        songs: this.props.songs,
        currentSong: this.props.currentSong,
        isPlaying: this.props.isPlaying,
        toggleOne: this.props.toggleOne
      }) }
    </div>
  );
  }
}

export default Artist;
