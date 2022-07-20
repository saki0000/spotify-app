import { Modal, Stack, Autocomplete, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { searchArtist } from "../../../spotify";
import PlaylistTrack from "../playlistTrack/PlaylistTrack";

const ArtistModal = ({ opened, setOpened, setSeedArtist }: any) => {
  const userToken = useSelector(selectToken);
  const [search, setSearchArtist] = useState<string>("");
  const [artistData, setArtistData] = useState<any>();
  useEffect(() => {
    searchArtist(search, userToken, setArtistData);
  }, [search, userToken]);
  return (
    <div>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened({ artist: false })}
        title={"Search an artist"}
      >
        <Stack align="stretch" style={{ marginTop: 30 }}>
          <Autocomplete
            value={search}
            data={[]}
            onChange={setSearchArtist}
            placeholder="Search Tracks"
          ></Autocomplete>
          {artistData ? (
            <>
              {artistData.map((value: any) => (
                <PlaylistTrack
                  valueId={value.id}
                  valueImage={value.images[2]}
                  valueArtistName={value.name}
                >
                  <ActionIcon
                    onClick={() => {
                      setSeedArtist({
                        id: value.id,
                        image: value.images[2].url,
                        name: value.name,
                      });
                      setOpened({ artist: false });
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

export default ArtistModal;
