/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { searchTopTracks } from "../../../spotify";
import useTrackFeature from "../../custom hooks/useTrackFeature";
import SongsInfoModal from "../../parts/modal/SongsInfoModal";
import TopTrackTemp from "../../templates/TopTrack";

const TopSongs = () => {
  const [songs, setSongs] = useState<any>([]);
  const token = useSelector(selectToken);
  const [terms, setTerms] = useState<any>("medium_term");
  const [opened, setOpened] = useState<boolean>(false);
  const [featureRow, setTrackFeature] = useTrackFeature();

  useEffect(() => {
    searchTopTracks(terms, token, setSongs);
  }, [terms]);
  return (
    <div>
      <TopTrackTemp
        terms={terms}
        setTerms={setTerms}
        songs={songs}
        trackFeature={setTrackFeature}
        setOpened={setOpened}
      />
      <SongsInfoModal
        opened={opened}
        setOpened={setOpened}
        featureRow={featureRow}
      />
    </div>
  );
};

export default TopSongs;
