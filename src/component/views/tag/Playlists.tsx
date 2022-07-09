/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import PlaylistModal from "../../parts/modal/PlaylistModal";
import CreatePlaylistModal from "../../parts/modal/CreatePlaylistModal";
import UpdatePlaylistModal from "../../parts/modal/UpdatePlaylistModal";
import DeletePlaylistModal from "../../parts/modal/DeletePlaylistModal";
import PlaylistsTemp from "../../templates/Playlists";
import usePlaylist from "../../custom hooks/usePlaylist";
import { getPlaylists } from "../../../spotify";

const Playlists = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [openedModal2, setOpenedModal2] = useState<boolean>(true);
  const [openedDelete, setOpenedDelete] = useState<boolean>(false);

  const [deleteData, setDeleteData] = useState<any>([]);
  const [
    playlists,
    tracksValue,
    tracksData,
    playlistValue,
    searchTrack,
    setTracksValue,
    setPlaylistValue,
    setSearchTrack,
  ] = usePlaylist();

  return (
    <div style={{ marginTop: 15 }}>
      <PlaylistModal
        opened={openedModal2}
        setOpened={setOpenedModal2}
        playlists={playlists}
        setPlaylistValue={setPlaylistValue}
      />
      <CreatePlaylistModal opened={openedModal} setOpened={setOpenedModal} />
      <UpdatePlaylistModal
        opened={opened}
        setOpened={setOpened}
        searchTracks={searchTrack}
        setSearchTracks={setSearchTrack}
        tracksData={tracksData}
        playlistValue={playlistValue}
      />
      <DeletePlaylistModal
        opened={openedDelete}
        setOpened={setOpenedDelete}
        deleteData={deleteData}
        tracksValue={tracksValue}
        setTracksValue={setTracksValue}
        setDeleteData={setDeleteData}
        playlistValue={playlistValue}
      />
      <PlaylistsTemp
        getPlaylists={getPlaylists}
        setOpenedModal2={setOpenedModal2}
        setOpenedModal={setOpenedModal}
        playlistValue={playlistValue}
        setOpened={setOpened}
        tracksValue={tracksValue}
        setOpenedDelete={setOpenedDelete}
        setDeleteData={setDeleteData}
        setTracksValue={setTracksValue}
      />
    </div>
  );
};

export default Playlists;
