import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/counter/counterSlice";
import { selectUser } from "../features/userSlice";

const Playlists = () => {
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);
  const [playlists, setPlaylists] = useState<any>();
  const [opened, setOpened] = useState(false);
  const [modalValue, setModalValue] = useState<any>();

  const modal = (playlist: any) => {
    getTracks(playlist);
    setOpened(true);
  };

  const getTracks = async (playlist: any) => {
    await axios
      .get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setModalValue(res.data.items);
        console.log(modalValue);
      });
  };
  const getPlaylists = async () => {
    await axios
      .get(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPlaylists(res.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ width: 700 }}>
        <Button onClick={getPlaylists} color="yellow">
          Playlists
        </Button>

        <Center>
          {playlists ? (
            <>
              <Grid grow>
                {playlists.map((playlist: any) => (
                  <Grid.Col span={4} key={playlist.id}>
                    <Card
                      shadow="sm"
                      p="lg"
                      withBorder
                      style={{ marginTop: 20 }}
                    >
                      <Card.Section>
                        <AspectRatio ratio={1 / 1}>
                          <Image src={playlist.images[1].url} alt="" />
                        </AspectRatio>
                      </Card.Section>

                      <Text onClick={() => modal(playlist)} align="center">
                        {playlist.name}
                      </Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
              {modalValue ? (
                <Modal
                  size="lg"
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title={" "}
                >
                  {modalValue.map((value: any) => (
                    <Box
                      sx={(theme) => ({
                        backgroundColor: theme.colors.gray[2],
                        textAlign: "center",
                        padding: theme.spacing.sm,
                        margin: theme.spacing.xs,
                        borderRadius: theme.radius.md,
                      })}
                    >
                      <Group align="center" style={{ height: 50 }}>
                        <Avatar src={value.track.album.images[2].url} alt="" />

                        <Text key={value.id}>{value.track.name}</Text>
                      </Group>
                    </Box>
                  ))}
                </Modal>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Center>
      </div>
    </>
  );
};

export default Playlists;
