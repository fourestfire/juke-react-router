import React from 'react';
import Albums from './Albums';
import Songs from './Songs';

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
        {/* we HAVE TO PASS PROPS MANUALLY because Albums
        and Songs are children of Artist (in this instance) */}
        <Albums {...this.props} />
        <Songs {...this.props} />
      </div>
    );
    
  }

}
export default Artist;
