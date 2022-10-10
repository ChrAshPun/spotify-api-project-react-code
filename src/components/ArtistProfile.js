import React from "react";
import styles from "./ArtistProfile.module.css";
import BackButton from "../assets/back-button.svg";

function ArtistProfile(props) {
  const handleBackButton = () => {
    props.setArtistName("");
    props.setArtistUrl("");
    props.setArtistImg("");
    props.setShowResult(false);
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.Background}></div>
      <img
        onClick={handleBackButton}
        className={styles.BackButton}
        src={BackButton}
        alt="Back-Button"
      />
      <div className={styles.LabelsContainer}>
        <div className={styles.ArtistTag}>Artist</div>
        <div className={styles.ArtistName}>{props.artistName}</div>
        <a
          className={styles.SpotifyButton}
          href={props.artistUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Spotify
        </a>
      </div>
      <img
        className={styles.ArtistImg}
        src={props.artistImg}
        alt="Artist-Img"
      />
    </div>
  );
}

export default ArtistProfile;
