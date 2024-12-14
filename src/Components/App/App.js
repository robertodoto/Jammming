import React, { use, useState } from 'react';
import style from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

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
  },
  {
    name: "example track name 3",
    artist: "example artist name 3",
    album: "example album name 3",
    id: 1
  },
  {
    name: "example track name 4",
    artist: "example artist name 4",
    album: "example album name 4",
    id: 2
  }
  ]);


  return (
      <div>
      <h1>
        Ja<span className={style.highlight}>mmm</span>ing
      </h1>
      <div className={style.App}>
        {/* <!-- Add a SearchBar component --> */}
        
        <div className={style['App-playlist']}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks}/>
          
        </div>
      </div>
    </div>
      );
}

export default App;
