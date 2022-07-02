import {
  Modal,
  Stack,
  Center,
  Box,
  Group,
  Avatar,
  ActionIcon,
  Text,
} from "@mantine/core";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const PlaylistModal = ({
  opened,
  setOpened,
  playlists,
  setPlaylistValue,
}: any) => {
  return (
    <div>
      <Modal
        size="md"
        opened={opened}
        onClose={() => setOpened(false)}
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
                    marginTop: theme.spacing.xs,
                    borderRadius: theme.radius.md,
                  })}
                >
                  <Group>
                    <Avatar src={playlist.images[0]?.url}></Avatar>
                    <Text>{playlist.name}</Text>

                    <ActionIcon
                      onClick={() => {
                        setPlaylistValue(playlist);
                        setOpened(false);
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
    </div>
  );
};

export default PlaylistModal;
