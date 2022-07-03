import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import { selectToken } from "../../features/counter/counterSlice";

const Player = ({ trackUri }: any) => {
  const userToken = useSelector(selectToken);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!userToken) return null;
  return (
    <>
      <SpotifyPlayer
        token={userToken}
        showSaveIcon
        callback={(state) => !state.isPlaying && setPlay(false)}
        play={play}
        uris={trackUri ? trackUri : []}
        styles={{
          activeColor: "#fff",
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "55px",
        }}
      />
    </>
  );
};

export default Player;
