import { Modal, Center, Stack, Autocomplete, Button } from "@mantine/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { selectUser } from "../../../features/userSlice";
import { createPlaylist } from "../../../spotify";

const CreatePlaylistModal = ({
  opened,
  setOpened,
}: // createPlaylist,
any) => {
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);
  const [description, setDescription] = useState<string>("");
  const [playlistName, setPlaylistName] = useState<string>("");
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
                createPlaylist(user.id, playlistName, description, userToken);
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
