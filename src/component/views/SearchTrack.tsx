import {
  AspectRatio,
  Autocomplete,
  Card,
  Center,
  Grid,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";
type modal = [string, string, string];

const SearchTrack = () => {
  const token = useSelector(selectToken);
  const [opened, setOpened] = useState(false);
  const [modalValue, setModalValue] = useState<modal>(["", "", ""]);
  const [track, setTrack] = useState("");
  const [tracksData, setTracksData] = useState<any>();

  const modal = (track: any) => {
    setModalValue([
      track.artists[0].name,
      track.name,
      track.album.images[1].url,
    ]);
    setOpened(true);
  };

  const searchTracks = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${track}&type=track`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setTracksData(res.data.tracks.items);
        console.log(tracksData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);
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
                <Grid.Col span={3}>
                  <Card
                    key={track.id}
                    shadow="sm"
                    p="lg"
                    withBorder
                    style={{ marginTop: 20 }}
                  >
                    <Card.Section>
                      <AspectRatio ratio={1 / 1}>
                        <Image src={track.album.images[1].url} alt="" />
                      </AspectRatio>
                    </Card.Section>

                    <Text style={{ marginTop: 10 }} align="center">
                      {track.artists[0].name}
                    </Text>

                    <Text align="center" onClick={() => modal(track)}>
                      {track.name}
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
              <Modal
                size="sm"
                opened={opened}
                onClose={() => setOpened(false)}
                title={modalValue[1]}
              >
                <Card shadow="sm" p="lg" withBorder>
                  <Card.Section>
                    <AspectRatio ratio={1 / 1}>
                      <Image src={modalValue[2]} alt="" />
                    </AspectRatio>
                  </Card.Section>
                  <Text style={{ marginTop: 5 }} align="center">
                    {modalValue[0]}
                  </Text>
                  <Text align="center">{modalValue[1]}</Text>
                </Card>
              </Modal>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Center>
    </div>
  );
};

export default SearchTrack;
