import { Center, Grid } from "@mantine/core";
import React from "react";
import Cards from "../parts/cards/Cards";

const NewAlbumPage = ({ tracksData }: any) => {
  return (
    <div>
      <Center>
        {tracksData ? (
          <>
            <Grid grow>
              {tracksData.map((track: any) => (
                <Cards
                  id={track.id}
                  image={track.images[1].url}
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

export default NewAlbumPage;
