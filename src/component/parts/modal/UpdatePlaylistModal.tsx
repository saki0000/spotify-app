import { Modal, Stack, Autocomplete, ActionIcon } from "@mantine/core";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { getPlaylistTracks, updatePlaylists } from "../../../spotify";
import PlaylistTrack from "../playlistTrack/PlaylistTrack";

const UpdatePlaylistModal = ({
  opened,
  setOpened,
  searchTracks,
  setSearchTracks,
  tracksData,
  playlistValue,
  setTracksValue,
}: any) => {
  const userToken = useSelector(selectToken);
  return (
    <div>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Update the Playlist"}
      >
        <Stack align="stretch" style={{ marginTop: 30 }}>
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
                      updatePlaylists(
                        value.uri,
                        userToken,
                        getPlaylistTracks,
                        playlistValue
                      );
                      getPlaylistTracks(
                        playlistValue,
                        userToken,
                        setTracksValue
                      );
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
      </Modal>
    </div>
  );
};

export default UpdatePlaylistModal;
