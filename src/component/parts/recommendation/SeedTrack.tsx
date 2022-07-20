import {
  Group,
  Stack,
  ActionIcon,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SeedTrack = ({ seedTrack, setSeedTrack, setOpened }: any) => {
  const theme = useMantineTheme();
  return (
    <div>
      {seedTrack.id !== "" ? (
        <>
          <Group>
            <Image width={80} height={80} src={seedTrack.image}></Image>
            <Stack>
              <Text>{seedTrack.name}</Text>
              <Text size="sm" color={theme.colors.dark[4]}>
                {seedTrack.artist}
              </Text>
            </Stack>

            <ActionIcon
              onClick={() => {
                setSeedTrack({
                  id: "",
                  image: "",
                  artist: "",
                  name: "",
                });
              }}
            >
              <AiOutlineMinus></AiOutlineMinus>
            </ActionIcon>
          </Group>
        </>
      ) : (
        <>
          <Stack align="center">
            <Text>Seed Track</Text>
            <ActionIcon
              onClick={() => {
                setOpened({ track: true });
              }}
            >
              <AiOutlinePlus></AiOutlinePlus>
            </ActionIcon>
          </Stack>
        </>
      )}
    </div>
  );
};

export default SeedTrack;
