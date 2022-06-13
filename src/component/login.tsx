import { Button, Container, Image, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { accessUrl } from "../spotify";
import image from "../source/ダウンロード.png";

function Login() {
  return (
    <Container>
      <Title order={1} style={{ marginTop: 100 }}>
        Spotify APP
      </Title>
      <Stack align="center" spacing="xl">
        <Image src={image} style={{ width: 200, margin: 20 }} />

        <Button color="yellow">
          <a href={accessUrl} style={{ textDecoration: "none" }}>
            <Text color="white">spotifyへログイン</Text>
          </a>
        </Button>
      </Stack>
    </Container>
  );
}

export default Login;
