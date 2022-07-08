import {
  Group,
  Select,
  Stack,
  Accordion,
  Center,
  Grid,
  Button,
} from "@mantine/core";
import React from "react";
import Cards from "../parts/cards/Cards";
import GenresInfo from "../parts/playlistTrack/GenresInfo";

const TopArtistTemp = ({
  terms,
  setTerms,
  genresData,
  artists,
  setOpened,
  setArtist,
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
      <Stack align="stretch">
        <Accordion iconPosition="right" style={{ marginBottom: 20 }}>
          <Accordion.Item label="Your Top Genres">
            <GenresInfo genresData={genresData} />
          </Accordion.Item>
        </Accordion>
      </Stack>
      <Center>
        <Grid>
          {artists.map((artist: any) => (
            <Cards
              id={artist.id}
              image={artist.images[1].url}
              artistName={artist.name}
            >
              <Button
                onClick={() => {
                  setOpened(true);
                  setArtist(artist);
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

export default TopArtistTemp;
