import { Modal, Title, Group, Button } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { deleteTrack } from "../../../spotify";

const DeletePlaylistModal = ({
  opened,
  setOpened,
  // deleteTrack,
  deleteData,
  tracksValue,
  setTracksValue,
  setDeleteData,
  playlistValue,
}: any) => {
  const userToken = useSelector(selectToken);

  return (
    <div>
      <Modal
        size="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title={""}
      >
        <Title>Delete the track?</Title>
        <Group position="right">
          <Button
            color="yellow"
            onClick={() => {
              deleteTrack(deleteData[0], playlistValue.id, userToken);
              const newAry = [...tracksValue].splice(
                deleteData[1] + 1,
                tracksValue.length - 1
              );
              setTracksValue(newAry);
              console.log([...tracksValue], deleteData[1], newAry);
              setDeleteData([]);
              setOpened(false);
            }}
          >
            Yes
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default DeletePlaylistModal;
