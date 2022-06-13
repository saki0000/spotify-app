/* eslint-disable react-hooks/exhaustive-deps */
import {
  useMantineTheme,
  Button,
  Card,
  Image,
  Text,
  Grid,
  Center,
  AspectRatio,
  Select,
  Group,
  Stack,
  Title,
  Divider,
  Paper,
  Badge,
  Modal,
  Accordion,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/counter/counterSlice";

const TopArtists = () => {
  const theme = useMantineTheme();
  const [display, setDisplay] = useState(true);
  const [artists, setArtists] = useState<any>([]);
  const token = useSelector(selectToken);
  const [terms, setTerms] = useState<any>("medium_term");
  const [genresData, setGenresData] = useState<any>({});
  const [opened, setOpened] = useState<boolean>(false);
  const [artist, setArtist] = useState<any>();

  const searchArtists = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${terms}&limit=30`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setArtists(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const caluculateGenres = useMemo(() => {
    const caluculate = (artists: any) => {
      let ary: { [key: string]: number };
      ary = {};
      // eslint-disable-next-line array-callback-return
      artists.map((artist: any) => {
        // eslint-disable-next-line array-callback-return
        artist.genres.map((genre: any) => {
          genre in ary ? (ary[genre] += 1) : (ary[genre] = 1);
        });
      });

      var array = Object.keys(ary).map((k) => ({ key: k, value: ary[k] }));

      array.sort((a, b) => b.value - a.value);
      const obj = Object.assign(
        {},
        ...array.map((item) => ({
          [item.key]: item.value,
        }))
      );
      Object.keys(obj).map((k: any) => {
        obj[k] === 1 ?? delete obj[k];
      });
      setGenresData(obj);
    };
    caluculate(artists);
  }, [artists]);

  useEffect(() => {
    searchArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  return (
    <div style={{ width: 700 }}>
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
        <Button
          color="yellow"
          onClick={() => {
            setDisplay(!display);
          }}
        >
          {display ? "非表示" : "表示"}
        </Button>
      </Group>
      <Stack align="stretch">
        <Accordion iconPosition="right" style={{ marginBottom: 20 }}>
          <Accordion.Item label="Your Top Genres">
            {Object.keys(genresData).map((k) => (
              <>
                {" "}
                <Grid grow>
                  {genresData[k] !== 1 ? (
                    <>
                      <Grid.Col span={6}>
                        <Paper
                          style={{ backgroundColor: theme.colors.gray[3] }}
                          radius="lg"
                          p="lg"
                        >
                          <Group position="center">
                            <Text>{k}</Text>
                            <Text>{genresData[k]}</Text>
                          </Group>
                        </Paper>
                      </Grid.Col>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
              </>
            ))}
            <div style={{ marginBottom: 400 }}></div>
          </Accordion.Item>
        </Accordion>
      </Stack>
      <Center>
        {display ? (
          <Grid>
            {artists.map((artist: any) => (
              <Grid.Col span={4}>
                <Card
                  key={artist.id}
                  shadow="sm"
                  p="lg"
                  withBorder
                  style={{ marginTop: 20 }}
                >
                  <Card.Section>
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        color={theme.colors.yellow[5]}
                        src={artist.images[1].url}
                        alt=""
                      />
                    </AspectRatio>
                  </Card.Section>
                  <Text style={{ marginTop: 15 }}>{artist.name}</Text>
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
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <></>
        )}
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title=""
          size="md"
        >
          {artist ? (
            <Stack align="center">
              <Text color={theme.colors.dark[3]}>
                <Title>{artist.name}</Title>
              </Text>
              <Group>
                <Text color={theme.colors.gray[6]}>Followers</Text>
                <Text color={theme.colors.gray[7]}>
                  {artist.followers.total.toLocaleString()}
                </Text>
              </Group>
              <Divider size="sm" variant="solid"></Divider>
              {artist.genres.map((value: string) => (
                <Badge color="yellow" size="lg">
                  {value}
                </Badge>
              ))}
            </Stack>
          ) : (
            <></>
          )}
        </Modal>
      </Center>
    </div>
  );
};

export default TopArtists;
