import { Group, Stack, ActionIcon, Image, Text } from "@mantine/core";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SeedTrack = ({ seedTrack, setSeedTrack, setOpened }: any) => {
  return (
    <div>
      {seedTrack.id !== "" ? (
        <>
          <Group>
            <Image src={seedTrack.image}></Image>
            <Stack>
              <Text>{seedTrack.name}</Text>
              <Text>{seedTrack.artist}</Text>
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
                setOpened({ artist: false, track: true, genre: false });
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
