import { Modal, Stack, Autocomplete, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { searchTracks } from "../../../spotify";
import PlaylistTrack from "../playlistTrack/PlaylistTrack";

const RecommendeModal = ({ opened, setOpened, setSeedTrack }: any) => {
  const userToken = useSelector(selectToken);
  const [searchTrack, setSearchTrack] = useState<string>("");
  const [tracksData, setTracksData] = useState<any>();
  useEffect(() => {
    searchTracks(searchTrack, userToken, setTracksData);
  }, [searchTrack, userToken]);
  return (
    <div>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened({ track: false })}
        title={"Search a track"}
      >
        <Stack align="stretch" style={{ marginTop: 30 }}>
          <Autocomplete
            value={searchTrack}
            data={[]}
            onChange={setSearchTrack}
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
                      setSeedTrack({
                        id: value.id,
                        image: value.album.images[2].url,
                        artist: value.artists[0].name,
                        name: value.name,
                      });
                      setOpened({ track: false });
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

export default RecommendeModal;
