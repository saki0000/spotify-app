import { Group, Avatar, Text, useMantineTheme, Divider } from "@mantine/core";

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
      <Group position="apart" align="center" style={{ height: 50 }}>
        <Group>
          {valueImage?.url ? (
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
      <Divider />
    </div>
  );
};

export default PlaylistTrack;
