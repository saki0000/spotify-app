import {
  Grid,
  Card,
  AspectRatio,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const Cards = ({ id, image, trackName, artistName, children }: any) => {
  const theme = useMantineTheme();
  return (
    <Grid.Col span={3}>
      <Card key={id} shadow="sm" p="lg" withBorder style={{ marginTop: 20 }}>
        <Card.Section>
          <AspectRatio ratio={1 / 1}>
            <Image color={theme.colors.yellow[5]} src={image} alt="" />
          </AspectRatio>
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
