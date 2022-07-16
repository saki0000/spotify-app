/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Badge, Grid } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import { getGenres } from "../../../spotify";

const GenresModal = ({ setSeedGenre, setOpened }: any) => {
  const userToken = useSelector(selectToken);
  const [allGenres, setAllGenres] = useState<any>([]);
  const [genres, setGenres] = useState<any>([""]);
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getGenre = useMemo(() => {
    getGenres(userToken, setAllGenres);
  }, []);
  useEffect(() => {
    if (search !== "") {
      const genre = allGenres.filter(
        (genre: string) =>
          genre.toUpperCase().indexOf(search.trim().toUpperCase()) !== -1
      );
      setGenres(genre);
    }
  }, [search]);
  return (
    <div>
      <Autocomplete data={[]} value={search} onChange={setSearch} />
      <Grid>
        {search !== ""
          ? genres.map((genre: string) => (
              <Grid.Col span={3}>
                <Badge
                  color="yellow"
                  size="lg"
                  onClick={() => {
                    setSeedGenre(genre);
                    setOpened({ genre: false });
                  }}
                >
                  {genre}
                </Badge>
              </Grid.Col>
            ))
          : allGenres.map((genre: string) => (
              <Grid.Col span={3}>
                <Badge
                  color="yellow"
                  size="lg"
                  onClick={() => {
                    setSeedGenre(genre);
                    setOpened({ track: false, genre: false });
                  }}
                >
                  {genre}
                </Badge>
              </Grid.Col>
            ))}
      </Grid>
    </div>
  );
};

export default GenresModal;
