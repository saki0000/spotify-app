import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { searchTracks } from "../../../spotify";
import SearchTrackTemp from "../../templates/SearchTrack";

const SearchTrack = () => {
  const token = useSelector(selectToken);

  const [track, setTrack] = useState("");
  const [tracksData, setTracksData] = useState<any>();
  const [uri, setUri] = useState<String>();

  useEffect(() => {
    searchTracks(track, token, setTracksData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);
  return (
    <div>
      <SearchTrackTemp
        track={track}
        setTrack={setTrack}
        tracksData={tracksData}
        uri={uri}
        setUri={setUri}
      />
    </div>
  );
};

export default SearchTrack;
