import {
  Grid,
  Card,
  AspectRatio,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import PlayerButton from "../player/PlayerButton";

const Cards = ({ id, image, trackName, artistName, uri, children }: any) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  return (
    <Grid.Col span={3}>
      <Card
        ref={ref}
        key={id}
        shadow="sm"
        p="lg"
        withBorder
        style={{ marginTop: 20 }}
      >
        <Card.Section style={{ position: "relative" }}>
          <AspectRatio ratio={1 / 1}>
            <Image color={theme.colors.yellow[5]} src={image} alt="" />
          </AspectRatio>
          {hovered ? (
            <>
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <PlayerButton uri={uri} size="xl" variant="filled" />
              </div>
            </>
          ) : (
            <></>
          )}
        </Card.Section>
        {trackName ? (
          <>
            <Text style={{ marginTop: 15 }}>{trackName}</Text>
            <Text size="sm" color={theme.colors.gray[7]}>
              {artistName}
            </Text>
          </>
        ) : (
          <Text style={{ marginTop: 15 }}>{artistName}</Text>
        )}

        {children}
      </Card>
    </Grid.Col>
  );
};

export default Cards;
