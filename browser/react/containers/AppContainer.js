import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip, convertSongs } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.loadAllAlbums = this.loadAllAlbums.bind(this);
    // this.deselectAlbum = this.deselectAlbum.bind(this);
  }

  componentDidMount () {
    this.loadAllAlbums()

    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => {
        this.setState({artists: artists})
      })

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  loadAllAlbums() {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));
  }

  onLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  // deprecated due to usage of Link on Sidebar
  // deselectAlbum () {
  //   this.setState({ selectedAlbum: {}});
  // }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  // The money zone
  selectArtist (artistId) {
    const artistPromise = axios.get(`/api/artists/${artistId}`)
      .then(res => res.data);

    const albumsPromise = axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(album => convertAlbums(album));

    const songsPromise = axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(song => convertSongs(song));

    Promise.all([artistPromise, albumsPromise, songsPromise]).then(values => {
      this.setState({
        selectedArtist: values[0],
        albums: values[1],
        songs: values[2]
      })
    });

  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar loadAllAlbums={this.loadAllAlbums}/>
        </div>

      {/* Frame */}
        <div className="col-xs-10">

          {
            (this.props.children && React.cloneElement(this.props.children, {

              /* album props */
              album: this.state.selectedAlbum,
              currentSong: this.state.currentSong,
              isPlaying: this.state.isPlaying,
              toggleOne: this.toggleOne,

              /* albumS props */
              albums: this.state.albums,
              selectAlbum: this.selectAlbum,

              /* artists props */
              artists: this.state.artists,
              selectArtist: this.selectArtist,

              /* artist props */
              selectedArtist: this.state.selectedArtist,

              /* Songs */
              songs: this.state.songs

            }))
          }
        </div>
      {/* Frame */}

        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
