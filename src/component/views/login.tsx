import { Button, Stack, Text } from "@mantine/core";
import { accessUrl } from "../../spotify";

function Login() {
  return (
    <div
      style={{
        width: "auto",
        height: "100%",

        backgroundColor: "#ffd700",
        backgroundSize: "contain",
        margin: 0,
      }}
    >
      <Stack style={{ height: "100%" }} align="center" justify="center">
        <Text color="white" weight={500} style={{ fontSize: 93 }}>
          Your Music with Spotify
        </Text>

        <Stack align="center" spacing="xl">
          <Button color="yellow" size="xl" radius="xl">
            <a href={accessUrl} style={{ textDecoration: "none" }}>
              <Text color="white">ログイン</Text>
            </a>
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default Login;
