/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/counter/counterSlice";
import ArtistInfoModal from "../../parts/modal/ArtistInfoModal";
import TopArtistTemp from "../../templates/TopArtist";

const TopArtists = () => {
  const [artists, setArtists] = useState<any>([]);
  const token = useSelector(selectToken);
  const [terms, setTerms] = useState<any>("medium_term");
  const [genresData, setGenresData] = useState<any>({});
  const [opened, setOpened] = useState<boolean>(false);
  const [artist, setArtist] = useState<any>();

  const searchArtists = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${terms}&limit=40`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        setArtists(res.data.items);
        console.log(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    searchArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  return (
    <div>
      <TopArtistTemp
        terms={terms}
        setTerms={setTerms}
        genresData={genresData}
        artists={artists}
        setOpened={setOpened}
        setArtist={setArtist}
      />
      <ArtistInfoModal artist={artist} opened={opened} setOpened={setOpened} />
    </div>
  );
};

export default TopArtists;
