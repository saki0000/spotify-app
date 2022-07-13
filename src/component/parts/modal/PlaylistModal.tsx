import {
  Modal,
  Stack,
  Group,
  Avatar,
  ActionIcon,
  Text,
  Divider,
} from "@mantine/core";
import { AiFillCheckCircle } from "react-icons/ai";

const PlaylistModal = ({
  opened,
  setOpened,
  playlists,
  setPlaylistValue,
}: any) => {
  return (
    <>
      <Modal
        size="sm"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select a Playlist"
      >
        <Stack align="stretch">
          {playlists ? (
            playlists.map((playlist: any) => (
              <>
                <Group position="apart" style={{ height: 50 }}>
                  <Group>
                    <Avatar src={playlist.images[0]?.url}></Avatar>
                    <Text>{playlist.name}</Text>
                  </Group>

                  <ActionIcon
                    onClick={() => {
                      setPlaylistValue(playlist);
                      setOpened(false);
                    }}
                  >
                    <AiFillCheckCircle size="sm"></AiFillCheckCircle>
                  </ActionIcon>
                </Group>
                <Divider />
              </>
            ))
          ) : (
            <></>
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default PlaylistModal;
