import { ActionIcon, Group, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import { selectToken } from "../../features/counter/counterSlice";
import { selectPlayer } from "../../features/playerSlice";

const Player = ({ trackUri }: any) => {
  const userToken = useSelector(selectToken);
  const player = useSelector(selectPlayer);
  const [opened, setOpened] = useState({ open: "", close: "none" });

  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!userToken) return null;
  return (
    <div style={{ position: "fixed", bottom: 15, right: 30 }}>
      {player.isPlayed ? (
        <>
          <Paper style={{ width: 600, padding: 10, display: opened.open }}>
            <Group>
              <ActionIcon
                onClick={() => {
                  setOpened({ open: "none", close: "" });
                }}
              >
                <AiOutlineRight></AiOutlineRight>
              </ActionIcon>

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
            </Group>
          </Paper>
          <ActionIcon
            onClick={() => {
              setOpened({ open: "", close: "none" });
            }}
            style={{ display: opened.close }}
          >
            <AiOutlineLeft></AiOutlineLeft>
          </ActionIcon>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Player;
