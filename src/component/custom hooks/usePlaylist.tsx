/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";
import { selectUser } from "../../features/userSlice";
import { getPlaylists, getPlaylistTracks, searchTracks } from "../../spotify";

const usePlaylist = () => {
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);

  const [playlists, setPlaylists] = useState<any>();
  const [playlistValue, setPlaylistValue] = useState<any>({});
  const [tracksValue, setTracksValue] = useState<any>();
  const [searchTracksData, setSearchTracksData] = useState<any>();
  const [searchTrack, setSearchTrack] = useState<any>("");

  useEffect(() => {
    getPlaylists(user.id, userToken, setPlaylists);
  }, []);
  useEffect(() => {
    getPlaylistTracks(playlistValue, userToken, setTracksValue);
    console.log("done");
  }, [playlistValue]);
  useEffect(() => {
    searchTracks(searchTrack, userToken, setSearchTracksData);
  }, [searchTrack]);
  return [
    playlists,
    tracksValue,
    searchTracksData,
    playlistValue,
    searchTrack,
    setTracksValue,
    setPlaylistValue,
    setSearchTrack,
  ];
};

export default usePlaylist;
