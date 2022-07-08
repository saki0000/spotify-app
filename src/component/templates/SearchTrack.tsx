import {
  ActionIcon,
  Autocomplete,
  Button,
  Center,
  Grid,
  Group,
  Space,
} from "@mantine/core";
import { AiFillCaretRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setIsPlayed, setPlayers } from "../../features/playerSlice";
import Cards from "../parts/cards/Cards";
import Player from "../parts/Player";

const SearchTrackTemp = ({ track, setTrack, tracksData, uri, setUri }: any) => {
  const dispatch = useDispatch();
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
                        dispatch(setPlayers(track.uri));
                        dispatch(setIsPlayed(true));
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

      <Player></Player>
    </div>
  );
};

export default SearchTrackTemp;
