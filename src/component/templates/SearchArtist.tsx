import { Autocomplete, Center, Grid } from "@mantine/core";
import React from "react";
import Cards from "../parts/cards/Cards";

const SearchArtistTemp = ({ artist, setArtist, artistsData }: any) => {
  return (
    <div>
      <Autocomplete
        value={artist}
        data={[]}
        onChange={setArtist}
        placeholder="Search Artists"
      ></Autocomplete>

      <Center>
        {artistsData ? (
          <>
            <Grid grow>
              {artistsData.map((artist: any) => (
                <Cards
                  id={artist.id}
                  image={artist.images[1].url}
                  artistName={artist.name}
                />
              ))}
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Center>
    </div>
  );
};

export default SearchArtistTemp;
