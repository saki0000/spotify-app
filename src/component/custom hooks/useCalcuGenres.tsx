import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";
import { searchArtists } from "../../spotify";

const useCalcuGenres = () => {
  const [genresData, setGenresData] = useState<any>({});
  const [terms, setTerms] = useState<any>("medium_term");
  const [artists, setArtists] = useState<any>([]);
  const token = useSelector(selectToken);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const caluculateGenres = useMemo(() => {
    const caluculate = (artists: any) => {
      let ary: { [key: string]: number };
      ary = {};
      // eslint-disable-next-line array-callback-return
      artists.map((artist: any) => {
        // eslint-disable-next-line array-callback-return
        artist.genres.map((genre: any) => {
          genre in ary ? (ary[genre] += 1) : (ary[genre] = 1);
        });
      });

      var array = Object.keys(ary).map((k) => ({ key: k, value: ary[k] }));

      array.sort((a, b) => b.value - a.value);
      const obj = Object.assign(
        {},
        ...array.map((item) => ({
          [item.key]: item.value,
        }))
      );
      // eslint-disable-next-line array-callback-return
      Object.keys(obj).map((k: any) => {
        obj[k] === 1 ?? delete obj[k];
      });
      setGenresData(obj);
    };
    caluculate(artists);
  }, [artists]);
  useEffect(() => {
    searchArtists(terms, token, setArtists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);
  return [artists, genresData, terms, setTerms];
};

export default useCalcuGenres;
