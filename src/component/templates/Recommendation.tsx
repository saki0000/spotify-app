import {
  ActionIcon,
  Divider,
  Grid,
  Group,
  Modal,
  Slider,
  Text,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/counter/counterSlice";
import { getRecommendations } from "../../spotify";
import Cards from "../parts/cards/Cards";
import ArtistModal from "../parts/modal/ArtistsModal";
import GenresModal from "../parts/modal/GenresModal";
import RecommendeModal from "../parts/modal/RecommendeModal";
import SeedArtist from "../parts/recommendation/seedArtist";
import SeedGenre from "../parts/recommendation/SeedGenre";
import SeedTrack from "../parts/recommendation/SeedTrack";

const Recommendation = () => {
  const userToken = useSelector(selectToken);
  const [opened, setOpened] = useSetState<any>({
    artist: false,
    track: false,
    genre: false,
  });
  const [seedArtist, setSeedArtist] = useState<any>({
    id: "",
    image: "",
    name: "",
  });
  const [seedTrack, setSeedTrack] = useState<any>({
    id: "",
    image: "",
    artist: "",
    name: "",
  });
  const [seedGenre, setSeedGenre] = useState<string>("");
  const [slider, setSlider] = useState<number>(50);
  const [popularity, setPopularity] = useState<number>(50);
  const [recommendedTrack, setReacommendedTrack] = useState<any>();
  useEffect(() => {
    getRecommendations(
      seedArtist.id,
      seedGenre,
      seedTrack.id,
      userToken,
      popularity,
      setReacommendedTrack
    );
  }, [seedArtist, seedGenre, seedTrack, userToken, popularity]);
  return (
    <div>
      <Group position="apart" style={{ height: 150 }}>
        <SeedArtist
          setOpened={setOpened}
          seedArtist={seedArtist}
          setSeedArtist={setSeedArtist}
        />
        <SeedTrack
          seedTrack={seedTrack}
          setSeedTrack={setSeedTrack}
          setOpened={setOpened}
        />
        <SeedGenre
          seedGenre={seedGenre}
          setSeedGenre={setSeedGenre}
          setOpened={setOpened}
        />
        <ActionIcon
          onClick={() => {
            getRecommendations(
              seedArtist.id,
              seedGenre,
              seedTrack.id,
              userToken,
              popularity,
              setReacommendedTrack
            );
          }}
        >
          <AiOutlineReload></AiOutlineReload>
        </ActionIcon>
      </Group>
      <div>
        <Text>popularity</Text>
        <Slider
          size="sm"
          color="yellow"
          value={slider}
          onChange={setSlider}
          onChangeEnd={setPopularity}
        />
      </div>

      <Divider />
      <div>
        {recommendedTrack ? (
          <>
            <Grid>
              {recommendedTrack.map((track: any) => (
                <Cards
                  id={track.id}
                  image={track.album.images[1].url}
                  artistName={track.artists[0].name}
                  trackName={track.name}
                  uri={track.uri}
                />
              ))}
            </Grid>
          </>
        ) : (
          <></>
        )}
      </div>
      <ArtistModal
        opened={opened.artist}
        setOpened={setOpened}
        setSeedArtist={setSeedArtist}
      />
      <RecommendeModal
        opened={opened.track}
        setOpened={setOpened}
        setSeedTrack={setSeedTrack}
      />
      <Modal
        size="xl"
        opened={opened.genre}
        onClose={() => setOpened({ track: false, genre: false })}
        title={"Update the Playlist"}
      >
        <GenresModal setSeedGenre={setSeedGenre} setOpened={setOpened} />
      </Modal>
    </div>
  );
};

export default Recommendation;
