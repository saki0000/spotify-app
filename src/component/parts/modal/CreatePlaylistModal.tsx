import { Modal, Center, Stack, Autocomplete, Button } from "@mantine/core";
import React from "react";

const CreatePlaylistModal = ({
  opened,
  setOpened,
  playlistName,
  setPlaylistName,
  description,
  setDescription,
  createPlaylist,
}: any) => {
  return (
    <div>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
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
                setOpened(false);
              }}
            >
              Create
            </Button>
          </Stack>
        </Center>
      </Modal>
    </div>
  );
};

export default CreatePlaylistModal;
