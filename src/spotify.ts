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

export const searchArtists = async (
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
