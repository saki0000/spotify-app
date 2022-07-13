import {
  AppShell,
  Avatar,
  Button,
  Container,
  Group,
  Header,
  Tabs,
  Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/counter/counterSlice";
import { selectUser } from "../../features/userSlice";
import Player from "../parts/player/Player";
import Recommendation from "../templates/Recommendation";
import NewAlbum from "./tag/NewAlbum";
import Playlists from "./tag/Playlists";
import SearchArtist from "./tag/SearchArtist";
import SearchTrack from "./tag/SearchTrack";
import TopArtists from "./tag/TopArtists";
import TopSongs from "./tag/TopSongs";

function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const Logout = () => {
    dispatch(logout());
    console.log("logout");
  };
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Group style={{ marginLeft: 20 }}>
              <Avatar src={user.image} />
              <Text>{user.displayName}</Text>
            </Group>

            <Button
              onClick={Logout}
              radius="lg"
              color="yellow"
              style={{ marginRight: 20 }}
            >
              Logout
            </Button>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container>
        <Tabs grow color="yellow" position="center" style={{ marginTop: 20 }}>
          <Tabs.Tab label="Top Artists" style={{ fontSize: 15 }}>
            <TopArtists />
          </Tabs.Tab>
          <Tabs.Tab label="Top Songs" style={{ fontSize: 15 }}>
            <TopSongs />
          </Tabs.Tab>
          <Tabs.Tab label="Search Artists" style={{ fontSize: 15 }}>
            <SearchArtist />
          </Tabs.Tab>
          <Tabs.Tab label="Search Tracks" style={{ fontSize: 15 }}>
            <SearchTrack />
          </Tabs.Tab>
          <Tabs.Tab label="Playlists" style={{ fontSize: 15 }}>
            <Playlists />
          </Tabs.Tab>
          <Tabs.Tab label="New Aubums" style={{ fontSize: 15 }}>
            <NewAlbum />
          </Tabs.Tab>
          <Tabs.Tab label="Recommende" style={{ fontSize: 15 }}>
            <Recommendation />
          </Tabs.Tab>
        </Tabs>

        <Player
          style={{ width: 300, marginRight: 10, bottom: 10, right: 10 }}
        ></Player>
      </Container>
    </AppShell>
  );
}

export default LoggedIn;
