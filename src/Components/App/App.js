import React, { use, useState } from 'react';
import style from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';

function App () {
  const [searchResults, setSearchResults] = useState([{
    name: "example track name 1",
    artist: "example artist name 1",
    album: "example album name 1",
    id: 1
  },
  {
    name: "example track name 2",
    artist: "example artist name 2",
    album: "example album name 2",
    id: 2
  }
]);
  const [playlistName, setPlaylistName] = useState("Example");
  const [playlistTracks, setPlaylistTracks] = useState([{
    name: "example playlist 1",
    artist: "example artist name 1",
    album: "example album name 1",
    id: 3
  },
  {
    name: "example playlist 2",
    artist: "example artist name 2",
    album: "example album name 2",
    id: 4
  },
  {
    name: "example playlist 3",
    artist: "example artist name 3",
    album: "example album name 3",
    id: 5
  },
  {
    name: "example playlist 4",
    artist: "example artist name 4",
    album: "example album name 4",
    id: 6
  }
  ]); 

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists")
    } else {
      setPlaylistTracks(newTrack);
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
  }

  function search(term) {
    console.log(term)
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
          />
        </div>
      </div>
    </div>
      );
}

export default App;
