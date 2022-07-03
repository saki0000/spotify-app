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
          activeColor: "#25262B",
          bgColor: "#fff",
          color: "#25262B",
          loaderColor: "#25262B",
          sliderColor: "#FFD43B",
          trackArtistColor: "#5C5F66",
          trackNameColor: "#25262B",
          height: "65px",
        }}
      />
    </>
  );
};

export default Player;
