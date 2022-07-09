import axios from "axios";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";

// const clientId = "2973baf5da5b4b9aa6f6bd10df7789d0";
const clientId = "4fea89fb9d694a29a9f1fc6f7ad5be95";

// 対応する範囲を決める
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-modify-public",
  "user-library-read",
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-modify-private",
];

type hash = any;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts: string[] = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {} as hash);
};

// SpotifyのログインページのURL
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const searchTopTracks = async (
  terms: string,
  token: string,
  setSongs: any
) => {
  await axios
    .get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${terms}&limit=40`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res: any) => {
      setSongs(res.data.items);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchTopArtists = async (
  terms: string,
  token: string,
  setArtists: any
) => {
  await axios
    .get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${terms}&limit=40`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res: any) => {
      setArtists(res.data.items);
      console.log(res.data.items);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchArtist = async (
  artist: string,
  token: string,
  setArtistsData: any
) => {
  await axios
    .get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      setArtistsData(res.data.artists.items);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchTracks = async (
  track: string,
  token: string,
  setTracksData: any
) => {
  await axios
    .get(`https://api.spotify.com/v1/search?q=${track}&type=track`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      setTracksData(res.data.tracks.items);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchNewTracks = async (setTracksData: any, token: string) => {
  await axios
    .get(`https://api.spotify.com/v1/browse/new-releases?limit=40`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      setTracksData(res.data.albums.items);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createPlaylist = async (
  userId: string,
  playlistName: string,
  description: string,
  userToken: string
) => {
  await axios
    .post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: playlistName,
        description: description,
        public: true,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "Content-Length": 92,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const updatePlaylists = async (
  uri: string,
  userToken: string,
  getTracks: Function,
  playlistValue: any
) => {
  await axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistValue.id}/tracks`,
      {
        uris: [uri],
        position: 0,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then(() => {
      getTracks(playlistValue);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTrack = async (
  uri: any,
  playlistValueId: string,
  userToken: string
) => {
  await axios
    .delete(`https://api.spotify.com/v1/playlists/${playlistValueId}/tracks`, {
      data: { tracks: [{ uri: uri }] },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
export const getPlaylists = async (
  userId: string,
  userToken: string,
  setPlaylists: any
) => {
  await axios
    .get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setPlaylists(res.data.items);

      console.log("hai");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getPlaylistTracks = async (
  playlist: any,
  userToken: string,
  setTracksValue: any
) => {
  await axios
    .get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setTracksValue(res.data.items);
    })
    .catch((err) => {
      console.log(err);
    });
};
