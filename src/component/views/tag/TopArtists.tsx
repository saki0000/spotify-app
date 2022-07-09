/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import useCalcuGenres from "../../custom hooks/useCalcuGenres";
import ArtistInfoModal from "../../parts/modal/ArtistInfoModal";
import TopArtistTemp from "../../templates/TopArtist";

const TopArtists = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [artist, setArtist] = useState<any>();
  const [artists, genresData, terms, setTerms] = useCalcuGenres();

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
