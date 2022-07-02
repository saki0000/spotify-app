import { Autocomplete, Center, Grid } from "@mantine/core";
import React from "react";
import Cards from "../parts/cards/Cards";

const SearchTrackTemp = ({ track, setTrack, tracksData }: any) => {
  return (
    <div>
      <Autocomplete
        placeholder="Search Tracks"
        value={track}
        data={[]}
        onChange={setTrack}
      ></Autocomplete>

      <Center>
        {tracksData ? (
          <>
            <Grid grow>
              {tracksData.map((track: any) => (
                <Cards
                  id={track.id}
                  image={track.album.images[1].url}
                  trackName={track.name}
                  artistName={track.artists[0].name}
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

export default SearchTrackTemp;
