import React, { useState } from "react";
import style from "./SearchBar.module.css"

function SearchBar (props) {
  const [term, setTerm] = useState("");

  function passTerm() {
    props.onSearch(term);
  }

function handleTermChange(event) {
  setTerm(event.target.value);
}

    return (
        <div className={style.SearchBar}>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleTermChange}
        />
        <button 
          className={style.SearchButton}
          onClick={passTerm} 
        >
          Search
        </button>
      </div>
        );
}

export default SearchBar;