import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import SearchForAnArtist from "./components/SearchForAnArtist";
import ArtistProfile from "./components/ArtistProfile";
import axios from "axios";
import { Buffer } from "buffer";

function App() {
  const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`;
  const SECRET_KEY = `${process.env.REACT_APP_SECRET_KEY}`;

  const [input, setInput] = useState("");
  const [token, setToken] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [artistImg, setArtistImg] = useState("");
  const [artistUrl, setArtistUrl] = useState("");
  const [refreshToken, setRefreshToken] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + SECRET_KEY).toString("base64"),
      },
      responseType: "json",
      data: {}, // pass data or it removes content-type from request
    }).then((response) => {
      setRefreshToken(false);
      setToken(response.data.access_token);
    });
  }, [CLIENT_ID, SECRET_KEY, refreshToken]);

  const fetchArtistProfile = () => {
    axios(`https://api.spotify.com/v1/search?q=${input}`, {
      method: "GET",
      params: {
        type: "artist",
        limit: 1,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.data.artists.items.length > 0) {
          setShowError(false);
          setArtistName(response.data.artists.items[0].name);
          setArtistImg(response.data.artists.items[0].images[1].url);
          setArtistUrl(response.data.artists.items[0].external_urls.spotify);
          setShowResult(true);
        } else {
          setShowError(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setRefreshToken(true);
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      await fetchArtistProfile();
    }
  };

  return (
    <div className={styles.App}>
      <section>
        {showResult ? (
          <ArtistProfile
            artistName={artistName}
            setArtistName={setArtistName}
            artistUrl={artistUrl}
            setArtistUrl={setArtistUrl}
            artistImg={artistImg}
            setArtistImg={setArtistImg}
            setShowResult={setShowResult}
          />
        ) : (
          <SearchForAnArtist
            setInput={setInput}
            handleSubmit={handleSubmit}
            showError={showError}
          />
        )}
      </section>
      <footer>
        <p>powered by Spotify and GitHub</p>
        <p>project by Christina Punla</p>
      </footer>
    </div>
  );
}

export default App;
