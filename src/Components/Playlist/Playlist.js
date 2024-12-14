import React from "react";
import styles from './Playlist.module.css';
import Tracklist from "../TrackList/Tracklist";

function Playlist(props) {
  return (
    <div className={styles.Playlist}>
      <input defaultValue={"New Playlist"} />
      <Tracklist userSearchResults={props.playlistTracks} />
      <button className={styles['Playlist-save']}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;