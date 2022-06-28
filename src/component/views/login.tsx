import { Button, Container, Stack, Text } from "@mantine/core";
import { accessUrl } from "../../spotify";
import image from "../../source/image.jpeg";

function Login() {
  return (
    <div
      style={{
        width: "auto",
        height: 821,
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        margin: 0,
      }}
    >
      <Container>
        <Text
          color="white"
          weight={500}
          style={{ fontSize: 93, paddingTop: 170, paddingBottom: 50 }}
        >
          Your Music with Spotify
        </Text>

        <Stack align="center" spacing="xl">
          <Button color="yellow" size="xl" radius="xl">
            <a href={accessUrl} style={{ textDecoration: "none" }}>
              <Text color="white">ログイン</Text>
            </a>
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default Login;
