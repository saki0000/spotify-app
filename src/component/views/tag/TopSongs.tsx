/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import SongsInfoModal from "../../parts/modal/SongsInfoModal";
import TopTrackTemp from "../../templates/TopTrack";

const TopSongs = () => {
  const [songs, setSongs] = useState<any>([]);
  const token = useSelector(selectToken);
  const [terms, setTerms] = useState<any>("medium_term");
  const [opened, setOpened] = useState<boolean>(false);
  const [features, setFeatures] = useState<any>([]);
  const [featureRow, setFeatureRow] = useState<any>();

  const searchArtists = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${terms}&limit=40`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setSongs(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const trackFeature = async (id: string) => {
    await axios
      .get(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setFeatures([
          {
            feature: "acousticness",
            A: Math.round(res.data.acousticness * 1000) / 10,
          },
          {
            feature: "danceability",
            A: Math.round(res.data.danceability * 1000) / 10,
          },
          {
            feature: "energy",
            A: Math.round(res.data.energy * 1000) / 10,
          },
          {
            feature: "instrumentalness",
            A: Math.round(res.data.instrumentalness * 1000) / 10,
          },
          {
            feature: "liveness",
            A: Math.round(res.data.liveness * 1000) / 10,
          },

          {
            feature: "valence",
            A: Math.round(res.data.valence * 1000) / 10,
          },
        ]);
      })
      .then(() => {
        setFeatureRow(
          features.map((f: any) => (
            <tr key={f.feature}>
              <td>{f.feature}</td>
              <td>{f.A}</td>
            </tr>
          ))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchArtists();
  }, [terms]);
  return (
    <div>
      <TopTrackTemp
        terms={terms}
        setTerms={setTerms}
        songs={songs}
        trackFeature={trackFeature}
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
