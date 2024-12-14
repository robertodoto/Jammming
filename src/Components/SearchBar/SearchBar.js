import React from "react";
import style from "./SearchBar.module.css"

function SearchBar () {
    return (
        <div className={style.SearchBar}>
        <input
          placeholder="Enter A Song, Album, or Artist"
        />
        <button className={style.SearchButton} >
          Search
        </button>
      </div>
        );
}

export default SearchBar;