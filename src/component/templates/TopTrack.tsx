import { Group, Select, Button, Center, Grid } from "@mantine/core";
import React from "react";
import Cards from "../parts/cards/Cards";

const TopTrackTemp = ({
  terms,
  setTerms,
  songs,
  trackFeature,
  setOpened,
}: any) => {
  return (
    <div>
      <Group position="center">
        <Select
          value={terms}
          size="md"
          data={[
            { value: "long_term", label: "Several Years" },
            { value: "medium_term", label: "Last 4 Months" },
            { value: "short_term", label: "Last 4 Weeks" },
          ]}
          onChange={setTerms}
        ></Select>
      </Group>

      <Center>
        <Grid grow>
          {songs.map((song: any) => (
            <Cards
              id={song.id}
              image={song.album.images[1].url}
              trackName={song.name}
              artistName={song.artists[0].name}
              uri={song.uri}
            >
              <Button
                onClick={() => {
                  trackFeature(song.id);
                  setOpened(true);
                }}
                variant="subtle"
                radius="lg"
                color="yellow"
              >
                Infomation
              </Button>
            </Cards>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default TopTrackTemp;
