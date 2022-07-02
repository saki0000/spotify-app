import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import NewAlbumPage from "../../templates/NewAlbum";

const NewAlbum = () => {
  const token = useSelector(selectToken);
  const [tracksData, setTracksData] = useState<any>();

  const searchTracks = async () => {
    await axios
      .get(`https://api.spotify.com/v1/browse/new-releases?limit=40`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setTracksData(res.data.albums.items);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <NewAlbumPage tracksData={tracksData} />;
};

export default NewAlbum;
