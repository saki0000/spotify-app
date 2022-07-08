import {
  Autocomplete,
  Button,
  Center,
  Grid,
  Group,
  Space,
} from "@mantine/core";
import Cards from "../parts/cards/Cards";
import PlayerButton from "../parts/player/PlayerButton";

const SearchTrackTemp = ({ track, setTrack, tracksData, uri, setUri }: any) => {
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
                    <PlayerButton uri={track.uri}></PlayerButton>
                  </Group>
                </Cards>
              ))}
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Center>
    </div>
  );
};

export default SearchTrackTemp;
