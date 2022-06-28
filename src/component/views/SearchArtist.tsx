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
import { selectToken } from "../features/counter/counterSlice";

const SearchArtist = () => {
  const token = useSelector(selectToken);
  const [opened, setOpened] = useState(false);
  const [artist, setArtist] = useState("");
  const [artistsData, setArtistsData] = useState<any>();

  const searchArtist = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setArtistsData(res.data.artists.items);
        console.log(artistsData);
        setOpened(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artist]);
  return (
    <div>
      <Autocomplete
        value={artist}
        data={[]}
        onChange={setArtist}
        placeholder="Search Artists"
      ></Autocomplete>

      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title={artist}
      >
        <Center>
          {artistsData ? (
            <>
              <Grid grow>
                {artistsData.map((artist: any) => (
                  <Grid.Col span={3}>
                    <Card
                      key={artist.id}
                      shadow="sm"
                      p="lg"
                      withBorder
                      style={{ marginTop: 20 }}
                    >
                      <Card.Section>
                        <AspectRatio ratio={1 / 1}>
                          <Image src={artist.images[1].url} alt="" />
                        </AspectRatio>
                      </Card.Section>
                      <Text>{artist.name}</Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Center>
      </Modal>
    </div>
  );
};

export default SearchArtist;
