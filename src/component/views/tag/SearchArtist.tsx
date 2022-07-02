import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import SearchArtistTemp from "../../templates/SearchArtist";

const SearchArtist = () => {
  const token = useSelector(selectToken);
  const [artist, setArtist] = useState("");
  const [artistsData, setArtistsData] = useState<any>();

  const searchArtist = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setArtistsData(res.data.artists.items);
        console.log(artistsData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artist]);
  return (
    <div>
      <SearchArtistTemp
        artist={artist}
        setArtist={setArtist}
        artistsData={artistsData}
      />
    </div>
  );
};

export default SearchArtist;
