import {
  ActionIcon,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";
import { getRecommendations } from "../../spotify";
import Cards from "../parts/cards/Cards";
import GenresModal from "../parts/modal/GenresModal";
import RecommendeModal from "../parts/modal/RecommendeModal";

const Recommendation = () => {
  const userToken = useSelector(selectToken);
  const [opened, setOpened] = useState<any>({ track: false, genre: false });
  const [seedTrack, setSeedTrack] = useState<any>(null);
  const [seedGenre, setSeedGenre] = useState<string>("");
  const [recommendedTrack, setReacommendedTrack] = useState<any>();
  useEffect(() => {
    if (seedTrack == null) {
      console.log("hi");
      getRecommendations(seedGenre, "", userToken, setReacommendedTrack);
    } else {
      console.log("hello");
      console.log(seedGenre);
      getRecommendations(
        seedGenre,
        seedTrack.id,
        userToken,
        setReacommendedTrack
      );
    }
  }, [seedGenre, seedTrack, userToken]);
  return (
    <div>
      <Group>
        <Stack justify="center" align="center" style={{ height: 150 }}>
          {seedTrack !== null ? (
            <>
              <Group>
                <Image src={seedTrack.album.images[2].url}></Image>
                <Text size="xl">{seedTrack.name}</Text>
                <Text>{seedTrack.artists[0].name}</Text>
                <ActionIcon
                  onClick={() => {
                    setSeedTrack(null);
                  }}
                >
                  <AiOutlineMinus></AiOutlineMinus>
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    getRecommendations(
                      seedGenre,
                      seedTrack.id,
                      userToken,
                      setReacommendedTrack
                    );
                  }}
                >
                  <AiOutlineReload></AiOutlineReload>
                </ActionIcon>
              </Group>
            </>
          ) : (
            <>
              <Stack>
                <ActionIcon
                  onClick={() => {
                    setOpened({ track: true, genre: false });
                  }}
                >
                  <AiOutlinePlus></AiOutlinePlus>
                </ActionIcon>
              </Stack>
            </>
          )}
        </Stack>
        {seedGenre ? (
          <>
            {seedGenre}
            <ActionIcon
              onClick={() => {
                setSeedGenre("");
              }}
            >
              <AiOutlineMinus></AiOutlineMinus>
            </ActionIcon>
          </>
        ) : (
          <>
            <Stack>
              <ActionIcon
                onClick={() => {
                  setOpened({ track: false, genre: true });
                }}
              >
                <AiOutlinePlus></AiOutlinePlus>
              </ActionIcon>
            </Stack>
          </>
        )}
      </Group>

      <Divider />
      <div>
        {recommendedTrack ? (
          <>
            <Grid>
              {recommendedTrack.map((track: any) => (
                <Cards
                  id={track.id}
                  image={track.album.images[1].url}
                  artistName={track.artists[0].name}
                  trackName={track.name}
                />
              ))}
            </Grid>
          </>
        ) : (
          <></>
        )}
      </div>
      <RecommendeModal
        opened={opened.track}
        setOpened={setOpened}
        setSeedTrack={setSeedTrack}
      />
      <Modal
        size="xl"
        opened={opened.genre}
        onClose={() => setOpened({ track: false, genre: false })}
        title={"Update the Playlist"}
      >
        <GenresModal setSeedGenre={setSeedGenre} setOpened={setOpened} />
      </Modal>
    </div>
  );
};

export default Recommendation;
