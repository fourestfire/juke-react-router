import React from 'react';
import Albums from './Albums';
import Songs from './Songs';
import {Link} from 'react-router';

const Artist = (props) => {

  const selectedArtist = props.selectedArtist;
  const children = props.children;

/*  const artistId = this.props.routeParams.artistId;
  const selectArtist = this.props.selectArtist;

  selectArtist(artistId);*/

  const propsToPassToChildren = {songs: props.songs};

  return (
    <div>
      <h3>{ selectedArtist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/albums/${children}`}>ALBUMS</Link></li>
          <li><Link to={`/albums/${children}`}>SONGS</Link></li>
        </ul>
      { children && React.cloneElement(children, propsToPassToChildren) }
    </div>
  );
    
};
export default Artist;
