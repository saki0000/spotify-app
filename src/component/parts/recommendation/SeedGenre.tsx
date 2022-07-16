import { ActionIcon, Stack, Text } from "@mantine/core";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SeedGenre = ({ seedGenre, setSeedGenre, setOpened }: any) => {
  return (
    <div>
      {seedGenre ? (
        <>
          {seedGenre}
          <ActionIcon
            onClick={() => {
              setSeedGenre("");
            }}
          >
            <AiOutlineMinus></AiOutlineMinus>
          </ActionIcon>
        </>
      ) : (
        <>
          <Stack align="center">
            <Text>Seed Genre</Text>
            <ActionIcon
              onClick={() => {
                setOpened({ artist: false, track: false, genre: true });
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

export default SeedGenre;
