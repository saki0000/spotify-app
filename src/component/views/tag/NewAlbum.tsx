import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { searchNewTracks } from "../../../spotify";
import NewAlbumPage from "../../templates/NewAlbum";

const NewAlbum = () => {
  const token = useSelector(selectToken);
  const [tracksData, setTracksData] = useState<any>();

  useEffect(() => {
    searchNewTracks(setTracksData, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <NewAlbumPage tracksData={tracksData} />;
};

export default NewAlbum;
