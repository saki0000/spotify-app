import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { searchArtist } from "../../../spotify";
import SearchArtistTemp from "../../templates/SearchArtist";

const SearchArtist = () => {
  const token = useSelector(selectToken);
  const [artist, setArtist] = useState("");
  const [artistsData, setArtistsData] = useState<any>();

  useEffect(() => {
    searchArtist(artist, token, setArtistsData);
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
