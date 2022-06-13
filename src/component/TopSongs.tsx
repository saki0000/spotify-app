/* eslint-disable react-hooks/exhaustive-deps */
import {
  AspectRatio,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Modal,
  Select,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { selectToken } from "../features/counter/counterSlice";

const TopSongs = () => {
  const theme = useMantineTheme();
  const [display, setDisplay] = useState(true);
  const [songs, setSongs] = useState<any>([]);
  const token = useSelector(selectToken);
  const [terms, setTerms] = useState<any>("medium_term");
  const [opened, setOpened] = useState<boolean>(false);
  const [features, setFeatures] = useState<any>([]);

  const searchArtists = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${terms}&limit=30`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setSongs(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const trackFeature = async (id: string) => {
    await axios
      .get(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setFeatures([
          {
            feature: "acousticness",
            A: res.data.acousticness * 100,
          },
          {
            feature: "danceability",
            A: res.data.danceability * 100,
          },
          {
            feature: "energy",
            A: res.data.energy * 100,
          },
          {
            feature: "instrumentalness",
            A: res.data.instrumentalness * 100,
          },
          {
            feature: "liveness",
            A: res.data.liveness * 100,
          },

          {
            feature: "valence",
            A: res.data.valence * 100,
          },
        ]);
        console.log(features);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchArtists();
  }, [terms]);
  return (
    <div>
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
            radius="xl"
            color="yellow"
            onClick={() => {
              setDisplay(!display);
            }}
          >
            {display ? "非表示" : "表示"}
          </Button>
        </Group>

        <Center>
          {display ? (
            <Grid grow>
              {songs.map((song: any) => (
                <Grid.Col span={4}>
                  <Card
                    key={song.id}
                    shadow="sm"
                    p="lg"
                    withBorder
                    style={{ marginTop: 20 }}
                  >
                    <Card.Section>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          color={theme.colors.yellow[5]}
                          width={340}
                          height={340}
                          src={song.album.images[1].url}
                          alt=""
                        />
                      </AspectRatio>
                    </Card.Section>
                    <Text
                      onClick={() => {
                        trackFeature(song.id);
                        setOpened(true);
                      }}
                      style={{ marginTop: 15 }}
                    >
                      {song.name}
                    </Text>
                    <Text size="sm" color={theme.colors.gray[7]}>
                      {song.artists[0].name}
                    </Text>
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
            size="lg"
          >
            <Center>
              <BarChart data={features}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="feature" />
                <YAxis />
                <Tooltip label={undefined} children={undefined} />
                <Legend />
                <Bar dataKey="A" fill="#8884d8" />
              </BarChart>
            </Center>
          </Modal>
        </Center>
      </div>
    </div>
  );
};

export default TopSongs;
