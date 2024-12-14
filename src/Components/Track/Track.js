import React from "react";
import styles from "./Track.module.css";

function Track (props) {
    function renderAction () {
        return <button className="Track-action">{props.isRemoval ? "+" : "-"}</button>
    }

    return (
      <div className={styles.Track}>
        <div className={styles['Track-information']}>
          <h3>{props.track.name}</h3>
          <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {/* <button class="Track-action"><!-- + or - will go here --></button> */}
      </div>
    );
}

export default Track;