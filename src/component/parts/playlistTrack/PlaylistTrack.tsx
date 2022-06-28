import { Box, Group, Avatar, Text, useMantineTheme } from "@mantine/core";
import React from "react";

const PlaylistTrack = ({
  valueId,
  valueImage,
  valueName,
  valueArtistName,
  children,
}: any) => {
  const theme = useMantineTheme();
  return (
    <div>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[2],
          textAlign: "center",
          padding: theme.spacing.sm,
          margin: theme.spacing.xs,
          borderRadius: theme.radius.md,
        })}
        style={{ width: 650 }}
        key={valueId}
      >
        <Group position="apart" align="center" style={{ height: 50 }}>
          <Group>
            {valueImage.url ? (
              <Avatar src={valueImage.url} alt="" />
            ) : (
              <Avatar src={""} />
            )}

            <Text>{valueName}</Text>
            <Text size="sm" color={theme.colors.gray[7]}>
              {valueArtistName}
            </Text>
          </Group>
          {children}
        </Group>
      </Box>
    </div>
    // <div>
    //   <Box
    //     sx={(theme) => ({
    //       backgroundColor: theme.colors.gray[2],
    //       textAlign: "center",
    //       padding: theme.spacing.sm,
    //       margin: theme.spacing.xs,
    //       borderRadius: theme.radius.md,
    //     })}
    //     style={{ width: 650 }}
    //     key={value.id}
    //   >
    //     <Group position="apart" align="center" style={{ height: 50 }}>
    //       <Group>
    //         {value.track.album.images[2].url ? (
    //           <Avatar src={value.track.album.images[2].url} alt="" />
    //         ) : (
    //           <Avatar src={""} />
    //         )}

    //         <Text>{value.track.name}</Text>
    //         <Text size="sm" color={theme.colors.gray[7]}>
    //           {value.track.artists[0].name}
    //         </Text>
    //       </Group>
    //       {children}
    //     </Group>
    //   </Box>
    // </div>
  );
};

export default PlaylistTrack;
