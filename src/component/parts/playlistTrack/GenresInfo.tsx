import { Group, Text, Divider, Stack } from "@mantine/core";

const GenresInfo = ({ genresData }: any) => {
  return (
    <div>
      {Object.keys(genresData).map((k) => (
        <>
          <Stack>
            {genresData[k] !== 1 ? (
              <div style={{ height: 50 }}>
                <Group position="center">
                  <Text>{k}</Text>
                  <Text>{genresData[k]}</Text>
                </Group>
                <Divider />
              </div>
            ) : (
              <></>
            )}
          </Stack>
        </>
      ))}
    </div>
  );
};

export default GenresInfo;
