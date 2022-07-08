import {
  Group,
  Button,
  Stack,
  Avatar,
  Title,
  Menu,
  ActionIcon,
} from "@mantine/core";

import {
  AiFillCaretDown,
  AiFillCustomerService,
  AiFillTool,
  AiFillDelete,
  AiFillCaretRight,
} from "react-icons/ai";
import PlaylistTrack from "../parts/playlistTrack/PlaylistTrack";
import image from "../../source/ダウンロード.png";
import { useDispatch } from "react-redux";
import { setIsPlayed, setPlayers } from "../../features/playerSlice";

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
  const dispatch = useDispatch();
  return (
    <>
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

      <Stack align="stretch" style={{ marginTop: 30 }}>
        {playlistValue !== {} ? (
          <Group position="center" style={{ marginBottom: 20 }}>
            {playlistValue.images ? (
              <Avatar src={playlistValue.images[2]?.url} placeholder={image} />
            ) : (
              <></>
            )}

            <Title>{playlistValue.name}</Title>
            <ActionIcon
              onClick={() => {
                dispatch(setPlayers(playlistValue.uri));
                dispatch(setIsPlayed(true));
              }}
              color="yellow"
              variant="outline"
              radius="xl"
            >
              <AiFillCaretRight></AiFillCaretRight>
            </ActionIcon>
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
    </>
  );
};

export default PlaylistsTemp;
