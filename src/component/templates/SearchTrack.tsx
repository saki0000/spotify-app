import { Autocomplete, Button, Center, Dialog, Grid } from "@mantine/core";
import React, { useState } from "react";
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
                  <Button
                    onClick={() => {
                      setUri(track.uri);
                      setOpened(true);
                    }}
                  >
                    play
                  </Button>
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
      >
        <Player trackUri={uri}></Player>
      </Dialog>
    </div>
  );
};

export default SearchTrackTemp;
