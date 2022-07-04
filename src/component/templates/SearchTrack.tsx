import {
  ActionIcon,
  Autocomplete,
  Button,
  Center,
  Dialog,
  Grid,
  Group,
  Space,
} from "@mantine/core";
import React, { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import Cards from "../parts/cards/Cards";
import Player from "../parts/Player";

const SearchTrackTemp = ({ track, setTrack, tracksData, uri, setUri }: any) => {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Autocomplete
        placeholder="Search Tracks"
        value={track}
        data={[]}
        onChange={setTrack}
      ></Autocomplete>

      <Center>
        {tracksData ? (
          <>
            <Grid grow>
              {tracksData.map((track: any) => (
                <Cards
                  id={track.id}
                  image={track.album.images[1].url}
                  trackName={track.name}
                  artistName={track.artists[0].name}
                >
                  <Space h="xs" />
                  <Group position="center" spacing="xs">
                    <Button
                      onClick={() => {}}
                      variant="subtle"
                      radius="lg"
                      color="yellow"
                    >
                      Infomation
                    </Button>
                    <ActionIcon
                      onClick={() => {
                        setUri(track.uri);
                        setOpened(true);
                      }}
                      color="yellow"
                      variant="outline"
                      radius="xl"
                    >
                      <AiFillCaretRight></AiFillCaretRight>
                    </ActionIcon>
                  </Group>
                </Cards>
              ))}
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Center>
      <Dialog
        opened={opened}
        onClose={() => setOpened(false)}
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
        <Player style={{ width: 400, marginRight: 10 }} trackUri={uri}></Player>
      </Dialog>
    </div>
  );
};

export default SearchTrackTemp;
