/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { selectUser } from "../../../features/userSlice";
import PlaylistModal from "../../parts/modal/PlaylistModal";
import CreatePlaylistModal from "../../parts/modal/CreatePlaylistModal";
import UpdatePlaylistModal from "../../parts/modal/UpdatePlaylistModal";
import DeletePlaylistModal from "../../parts/modal/DeletePlaylistModal";
import PlaylistsTemp from "../../templates/Playlists";

const Playlists = () => {
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);

  const [opened, setOpened] = useState<boolean>(false);
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [openedModal2, setOpenedModal2] = useState<boolean>(true);
  const [openedDelete, setOpenedDelete] = useState<boolean>(false);

  const [playlists, setPlaylists] = useState<any>();
  const [playlistValue, setPlaylistValue] = useState<any>({});
  const [playlistName, setPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [tracksValue, setTracksValue] = useState<any>();
  const [tracksData, setTracksData] = useState<any>();
  const [searchTracks, setSearchTracks] = useState<any>("");

  const [deleteData, setDeleteData] = useState<any>([]);

  const createPlaylist = async () => {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          name: playlistName,
          description: description,
          public: true,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
            "Content-Length": 92,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updatePlaylists = async (uri: string) => {
    console.log(uri);
    await axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistValue.id}/tracks`,
        {
          uris: [uri],
          position: 0,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getTracks(playlistValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTrack = async (Uri: any) => {
    await axios
      .delete(
        `https://api.spotify.com/v1/playlists/${playlistValue.id}/tracks`,
        {
          data: { tracks: [{ uri: Uri }] },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const searchTrack = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${searchTracks}&type=track`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "Content-Length": 49,
        },
      })
      .then((res: any) => {
        setTracksData(res.data.tracks.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTracks = async (playlist: any) => {
    await axios
      .get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTracksValue(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPlaylists = async () => {
    await axios
      .get(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPlaylists(res.data.items);

        console.log("hai");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPlaylists();
  }, []);
  useEffect(() => {
    getTracks(playlistValue);
    console.log("done");
  }, [playlistValue]);
  useEffect(() => {
    searchTrack();
  }, [searchTracks]);

  return (
    <div style={{ marginTop: 15 }}>
      <PlaylistModal
        opened={openedModal2}
        setOpened={setOpenedModal2}
        playlists={playlists}
        setPlaylistValue={setPlaylistValue}
      />
      <CreatePlaylistModal
        opened={openedModal}
        setOpened={setOpenedModal}
        playlistName={playlistName}
        setPlaylistName={setPlaylistName}
        description={setDescription}
        createPlaylist={createPlaylist}
      />
      <UpdatePlaylistModal
        opened={opened}
        setOpened={setOpened}
        searchTracks={searchTracks}
        setSearchTracks={setSearchTracks}
        tracksData={tracksData}
        updatePlaylists={updatePlaylists}
        getTracks={getTracks}
      />
      <DeletePlaylistModal
        opened={openedDelete}
        setOpened={setOpenedDelete}
        deleteTrack={deleteTrack}
        deleteData={deleteData}
        tracksValue={tracksValue}
        setTracksValue={setTracksValue}
        setDeleteData={setDeleteData}
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
      />
    </div>
  );
};

export default Playlists;