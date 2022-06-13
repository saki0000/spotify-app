/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Center,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/counter/counterSlice";
import { selectUser } from "../features/userSlice";
import {
  AiFillCaretDown,
  AiFillCheckCircle,
  AiFillCustomerService,
  AiFillDelete,
  AiFillTool,
  AiOutlinePlus,
} from "react-icons/ai";
import image from "../source/ダウンロード.png";

const Playlists = () => {
  const theme = useMantineTheme();
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);
  const [playlists, setPlaylists] = useState<any>();
  const [tracksValue, setTracksValue] = useState<any>();
  const [playlistValue, setPlaylistValue] = useState<any>({});
  const [opened, setOpened] = useState<boolean>(false);
  const [searchTracks, setSearchTracks] = useState<any>("");
  const [tracksData, setTracksData] = useState<any>();
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openedModal2, setOpenedModal2] = useState<boolean>(true);
  const [openedDelete, setOpenedDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>([]);

  const createPlaylist = async () => {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          name: playlistName,
          description: description,
          public: true,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
            "Content-Length": 92,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updatePlaylists = async (uri: string) => {
    console.log(uri);
    await axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistValue.id}/tracks`,
        {
          uris: [uri],
          position: 0,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getTracks(playlistValue);
        console.log(tracksValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTrack = async (Uri: any) => {
    await axios
      .delete(
        `https://api.spotify.com/v1/playlists/${playlistValue.id}/tracks`,
        {
          data: { tracks: [{ uri: Uri }] },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const searchTrack = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${searchTracks}&type=track`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "Content-Length": 49,
        },
      })
      .then((res: any) => {
        setTracksData(res.data.tracks.items);
        console.log(res.data.tracks.items);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setTracksValue(res.data.items);
        console.log(tracksValue);
      })
      .catch((err) => {
        console.log(err);
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

        console.log("hai");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPlaylists();
  }, []);
  useEffect(() => {
    getTracks(playlistValue);
    console.log("done");
  }, [playlistValue]);
  useEffect(() => {
    searchTrack();
  }, [searchTracks]);

  return (
    <>
      <div style={{ width: 700, marginTop: 15 }}>
        <Modal
          size="md"
          opened={openedModal2}
          onClose={() => setOpenedModal2(false)}
          title="Select a Playlist"
        >
          <Stack>
            {playlists ? (
              playlists.map((playlist: any) => (
                <Center>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[2],
                      textAlign: "center",
                      padding: theme.spacing.sm,
                      margin: theme.spacing.xs,
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Group>
                      <Avatar src={playlist.images[0]?.url}></Avatar>
                      <Text>{playlist.name}</Text>

                      <ActionIcon
                        onClick={() => {
                          setPlaylistValue(playlist);
                          setOpenedModal2(false);
                        }}
                      >
                        <AiFillCheckCircle size="md"></AiFillCheckCircle>
                      </ActionIcon>
                    </Group>
                  </Box>
                </Center>
              ))
            ) : (
              <></>
            )}
          </Stack>
        </Modal>

        <Modal
          size="xl"
          opened={openedModal}
          onClose={() => setOpenedModal(false)}
          title="Create a Playlist"
        >
          <Center>
            <Stack>
              <Autocomplete
                data={[]}
                placeholder="Name"
                value={playlistName}
                onChange={setPlaylistName}
              ></Autocomplete>
              <Autocomplete
                data={[]}
                placeholder="Description"
                value={description}
                onChange={setDescription}
              ></Autocomplete>

              <Button
                color="yellow"
                onClick={() => {
                  createPlaylist();
                  setOpenedModal(false);
                }}
              >
                Create
              </Button>
            </Stack>
          </Center>
        </Modal>

        <Modal
          size="xl"
          opened={opened}
          onClose={() => setOpened(false)}
          title={"Update the Playlist"}
        >
          <Center>
            <Stack style={{ marginTop: 30 }}>
              <Autocomplete
                value={searchTracks}
                data={[]}
                onChange={setSearchTracks}
                placeholder="Search Tracks"
              ></Autocomplete>
              {tracksData ? (
                <>
                  {tracksData.map((value: any) => (
                    <Box
                      sx={(theme) => ({
                        backgroundColor: theme.colors.gray[2],
                        textAlign: "center",
                        padding: theme.spacing.sm,
                        margin: theme.spacing.xs,
                        borderRadius: theme.radius.md,
                      })}
                      key={value.id}
                    >
                      <Group align="apart" style={{ height: 50 }}>
                        <Group>
                          <Avatar src={value.album.images[2].url} alt="" />
                          <Text>{value.name}</Text>
                          <Text size="sm" color={theme.colors.gray[7]}>
                            {value.artists[0].name}
                          </Text>
                        </Group>

                        <Group>
                          <ActionIcon
                            onClick={() => {
                              updatePlaylists(value.uri);
                              getTracks(searchTracks);
                              setOpened(false);
                            }}
                          >
                            <AiOutlinePlus>add</AiOutlinePlus>
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Box>
                  ))}
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Center>
        </Modal>
        <Modal
          size="md"
          opened={openedDelete}
          onClose={() => setOpenedDelete(false)}
          title={""}
        >
          <Title>Delete the track?</Title>
          <Group position="right">
            <Button
              color="yellow"
              onClick={() => {
                deleteTrack(deleteData[0]);
                const newAry = [...tracksValue].splice(
                  deleteData[1] + 1,
                  tracksValue.length - 1
                );
                setTracksValue(newAry);
                console.log([...tracksValue], deleteData[1], newAry);
                setDeleteData([]);
                setOpenedDelete(false);
              }}
            >
              Yes
            </Button>
          </Group>
        </Modal>
        <Group position="center">
          <Button
            radius="xl"
            rightIcon={<AiFillCaretDown></AiFillCaretDown>}
            color="yellow"
            onClick={() => {
              getPlaylists();
              setOpenedModal2(true);
            }}
          >
            Playlists
          </Button>
          <Button
            radius="xl"
            rightIcon={<AiFillCustomerService></AiFillCustomerService>}
            color="yellow"
            onClick={() => setOpenedModal(true)}
          >
            Create
          </Button>
        </Group>

        <Center>
          <Stack style={{ marginTop: 30 }}>
            {playlistValue !== {} ? (
              <Group position="center">
                {playlistValue.images ? (
                  <Avatar
                    src={playlistValue.images[2]?.url}
                    placeholder={image}
                  />
                ) : (
                  <></>
                )}

                <Title>{playlistValue.name}</Title>
                <Menu>
                  <Menu.Label>Menu</Menu.Label>
                  <Menu.Item
                    icon={<AiFillTool></AiFillTool>}
                    onClick={() => setOpened(true)}
                  >
                    Update
                  </Menu.Item>
                </Menu>
              </Group>
            ) : (
              <></>
            )}

            {tracksValue ? (
              <>
                {tracksValue.map((value: any, index: number) => (
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[2],
                      textAlign: "center",
                      padding: theme.spacing.sm,
                      margin: theme.spacing.xs,
                      borderRadius: theme.radius.md,
                    })}
                    style={{ width: 650 }}
                    key={value.id}
                  >
                    <Group
                      position="apart"
                      align="center"
                      style={{ height: 50 }}
                    >
                      <Group>
                        {value.track.album.images[0].url ? (
                          <Avatar
                            src={value.track.album.images[2].url}
                            alt=""
                          />
                        ) : (
                          <Avatar src={""} />
                        )}

                        <Text>{value.track.name}</Text>
                        <Text size="sm" color={theme.colors.gray[7]}>
                          {value.track.artists[0].name}
                        </Text>
                      </Group>

                      <ActionIcon
                        onClick={() => {
                          setOpenedDelete(true);
                          setDeleteData([value.track.uri, index]);
                        }}
                      >
                        <AiFillDelete></AiFillDelete>
                      </ActionIcon>
                    </Group>
                  </Box>
                ))}
              </>
            ) : (
              <></>
            )}
          </Stack>
        </Center>
      </div>
    </>
  );
};

export default Playlists;
