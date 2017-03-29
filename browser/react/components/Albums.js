import React from 'react';
import {Link} from 'react-router';

// props only comes from the parent componnent so we have to make sure
// to manually pass props to Albums FROM the parent
const Albums = (props) => {

  const albums = props.albums;
  const selectAlbum = props.selectAlbum;
  console.log("albums", albums);

  return (
    <div>
      <h3>Albums</h3>
      <div className="row">
      {
        albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
             <Link className="thumbnail" onClick={() => selectAlbum(album.id)} to={`/albums/${album.id}`}>
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </Link>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Albums;
