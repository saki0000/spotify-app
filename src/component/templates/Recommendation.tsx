import {
  ActionIcon,
  Avatar,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";
import { getRecommendations } from "../../spotify";
import Cards from "../parts/cards/Cards";
import RecommendeModal from "../parts/modal/RecommendeModal";

const Recommendation = () => {
  const userToken = useSelector(selectToken);
  const [opened, setOpened] = useState<boolean>(false);
  const [seedTrack, setSeedTrack] = useState<any>();
  const [recommendedTrack, setReacommendedTrack] = useState<any>();
  useEffect(() => {
    if (seedTrack) {
      getRecommendations("", "", seedTrack.id, userToken, setReacommendedTrack);
    }
  }, [seedTrack, userToken]);
  return (
    <div>
      <Stack justify="center" align="center" style={{ height: 150 }}>
        {seedTrack ? (
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
                    "",
                    "",
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
            <ActionIcon
              onClick={() => {
                setOpened(true);
              }}
            >
              <AiOutlinePlus></AiOutlinePlus>
            </ActionIcon>
          </>
        )}
      </Stack>

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
        opened={opened}
        setOpened={setOpened}
        setSeedTrack={setSeedTrack}
      />
    </div>
  );
};

export default Recommendation;
