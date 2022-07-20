import { ActionIcon } from "@mantine/core";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setPlayers, setIsPlayed } from "../../../features/playerSlice";

const PlayerButton = ({ uri, size, variant }: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <ActionIcon
        onClick={() => {
          dispatch(setPlayers(uri));
          dispatch(setIsPlayed(true));
        }}
        color="yellow"
        variant={variant}
        radius="xl"
        size={size}
      >
        <AiFillCaretRight></AiFillCaretRight>
      </ActionIcon>
    </>
  );
};

export default PlayerButton;
