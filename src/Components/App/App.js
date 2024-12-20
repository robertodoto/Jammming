import React, { useState } from 'react';
import style from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import {Spotify} from '../../util/Spotify/Spotify';

function App () {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Example");
  const [playlistTracks, setPlaylistTracks] = useState([]); 

  function addTrack(track) {
    if (!playlistTracks.some(t => t.id === track.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
    }
  }   

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name)
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs)
    .then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
      alert('Playlist saved!');
    })
    .catch(error => {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist. Please, try again.');
    });
  }

  function search(term) {
    Spotify.search(term).then(result => setSearchResults(result));
  }

  return (
      <div>
      <h1>
        Ja<span className={style.highlight}>mmm</span>ing
      </h1>
      <div className={style.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className={style['App-playlist']}>
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
            updatePlaylistName={updatePlaylistName}
          />
        </div>
      </div>
    </div>
      );
}

export default App;
