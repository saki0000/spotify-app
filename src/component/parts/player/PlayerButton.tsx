import { ActionIcon } from "@mantine/core";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setPlayers, setIsPlayed } from "../../../features/playerSlice";

const PlayerButton = ({ uri }: { [uri: string]: string }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ActionIcon
        onClick={() => {
          dispatch(setPlayers(uri));
          dispatch(setIsPlayed(true));
        }}
        color="yellow"
        variant="outline"
        radius="xl"
      >
        <AiFillCaretRight></AiFillCaretRight>
      </ActionIcon>
    </>
  );
};

export default PlayerButton;
