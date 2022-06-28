import {
  Modal,
  Stack,
  Title,
  Group,
  Divider,
  Badge,
  Text,
  useMantineTheme,
} from "@mantine/core";

const ArtistInfoModal = ({ artist, opened, setOpened }: any) => {
  const theme = useMantineTheme();
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
        size="md"
      >
        {artist ? (
          <Stack align="center">
            <Text color={theme.colors.dark[3]}>
              <Title>{artist.name}</Title>
            </Text>
            <Group>
              <Text color={theme.colors.gray[6]}>Followers</Text>
              <Text color={theme.colors.gray[7]}>
                {artist.followers.total.toLocaleString()}
              </Text>
            </Group>
            <Divider size="sm" variant="solid"></Divider>
            {artist.genres.map((value: string) => (
              <Badge color="yellow" size="lg">
                {value}
              </Badge>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

export default ArtistInfoModal;
