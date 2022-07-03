import {
  Group,
  Button,
  Center,
  Stack,
  Avatar,
  Title,
  Menu,
  ActionIcon,
} from "@mantine/core";
import React from "react";
import {
  AiFillCaretDown,
  AiFillCustomerService,
  AiFillTool,
  AiFillDelete,
} from "react-icons/ai";
import PlaylistTrack from "../parts/playlistTrack/PlaylistTrack";
import image from "../../source/ダウンロード.png";

const PlaylistsTemp = ({
  getPlaylists,
  setOpenedModal2,
  setOpenedModal,
  playlistValue,
  setOpened,
  tracksValue,
  setOpenedDelete,
  setDeleteData,
}: any) => {
  return (
    <div>
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
                <PlaylistTrack
                  valueId={value.id}
                  valueImage={value.track.album.images[2]}
                  valueName={value.track.name}
                  valueArtistName={value.track.artists[0].name}
                >
                  <ActionIcon
                    onClick={() => {
                      setOpenedDelete(true);
                      setDeleteData([value.track.uri, index]);
                    }}
                  >
                    <AiFillDelete></AiFillDelete>
                  </ActionIcon>
                </PlaylistTrack>
              ))}
            </>
          ) : (
            <></>
          )}
        </Stack>
      </Center>
    </div>
  );
};

export default PlaylistsTemp;