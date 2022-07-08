import { Dialog } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import { selectToken } from "../../features/counter/counterSlice";
import { selectPlayer, setIsPlayed } from "../../features/playerSlice";

const Player = ({ trackUri }: any) => {
  const userToken = useSelector(selectToken);
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!userToken) return null;
  return (
    <>
      <Dialog
        opened={player.isPlayed}
        onClose={() => dispatch(setIsPlayed(false))}
        size="xl"
        radius="md"
        position={{ bottom: 10, right: 250 }}
        // withCloseButton
        style={{
          backgroundColor: "#fff",
          height: 100,
          width: 950,
        }}
      >
        <SpotifyPlayer
          token={userToken}
          showSaveIcon
          callback={(state) => !state.isPlaying && setPlay(false)}
          play={play}
          uris={player.isPlayed ? player.currentTrack : []}
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
      </Dialog>
    </>
  );
};

export default Player;
