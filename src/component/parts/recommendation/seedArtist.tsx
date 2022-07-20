import { Group, ActionIcon, Stack, Image, Text } from "@mantine/core";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SeedArtist = ({ setOpened, seedArtist, setSeedArtist }: any) => {
  return (
    <div>
      {seedArtist.id !== "" ? (
        <>
          <Group>
            <Image height={80} width={80} src={seedArtist.image}></Image>
            <Text>{seedArtist.name}</Text>
            <ActionIcon
              onClick={() => {
                setSeedArtist({ id: "", image: "", name: "" });
              }}
            >
              <AiOutlineMinus></AiOutlineMinus>
            </ActionIcon>
          </Group>
        </>
      ) : (
        <>
          <Stack align="center">
            <Text>Seed Artist</Text>
            <ActionIcon
              onClick={() => {
                setOpened({ artist: true });
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

export default SeedArtist;
