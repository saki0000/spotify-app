import { Modal, Center, Stack, Autocomplete, ActionIcon } from "@mantine/core";
import { AiOutlinePlus } from "react-icons/ai";
import PlaylistTrack from "../playlistTrack/PlaylistTrack";

const UpdatePlaylistModal = ({
  opened,
  setOpened,
  searchTracks,
  setSearchTracks,
  tracksData,
  updatePlaylists,
  getTracks,
}: any) => {
  return (
    <div>
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
                  <PlaylistTrack
                    valueId={value.id}
                    valueImage={value.album.images[2]}
                    valueName={value.name}
                    valueArtistName={value.artists[0].name}
                  >
                    <ActionIcon
                      onClick={() => {
                        updatePlaylists(value.uri);
                        getTracks(searchTracks);
                        setOpened(false);
                      }}
                    >
                      <AiOutlinePlus>add</AiOutlinePlus>
                    </ActionIcon>
                  </PlaylistTrack>
                ))}
              </>
            ) : (
              <></>
            )}
          </Stack>
        </Center>
      </Modal>
    </div>
  );
};

export default UpdatePlaylistModal;
