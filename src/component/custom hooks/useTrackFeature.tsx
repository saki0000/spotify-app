import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";

const useTrackFeature = () => {
  const [features, setFeatures] = useState<any>();
  const token = useSelector(selectToken);
  const [featureRow, setFeatureRow] = useState();
  const setTrackFeature = async (id: string) => {
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

  return [featureRow, setTrackFeature];
};

export default useTrackFeature;
