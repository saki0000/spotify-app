import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import SearchTrackTemp from "../../templates/SearchTrack";

const SearchTrack = () => {
  const token = useSelector(selectToken);

  const [track, setTrack] = useState("");
  const [tracksData, setTracksData] = useState<any>();

  const searchTracks = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${track}&type=track`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setTracksData(res.data.tracks.items);
        console.log(tracksData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);
  return (
    <div>
      <SearchTrackTemp
        track={track}
        setTrack={setTrack}
        tracksData={tracksData}
      />
    </div>
  );
};

export default SearchTrack;
