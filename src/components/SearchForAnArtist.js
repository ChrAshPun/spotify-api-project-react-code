import React from "react";
import styles from "./SearchForAnArtist.module.css";
import SearchSVG from "../assets/search.svg";

function SearchForAnArtist(props) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.handleSubmit(e);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <h1>Search for an Artist</h1>
      <form>
        <img src={SearchSVG} alt="search.svg" />
        <input
          type="text"
          placeholder="Artist Name"
          onInput={(e) => props.setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </form>
      {props.showError ? (
        <div className={styles.Error}>Artist not found</div>
      ) : (
        <div className={styles.Empty}></div>
      )}
    </div>
  );
}

export default SearchForAnArtist;
