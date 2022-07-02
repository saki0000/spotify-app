import { Grid, Paper, Group, Text, useMantineTheme } from "@mantine/core";
import React from "react";

const GenresInfo = ({ genresData }: any) => {
  const theme = useMantineTheme();
  return (
    <div>
      {Object.keys(genresData).map((k) => (
        <>
          {" "}
          <Grid grow>
            {genresData[k] !== 1 ? (
              <>
                <Grid.Col span={6}>
                  <Paper
                    style={{ backgroundColor: theme.colors.gray[3] }}
                    radius="lg"
                    p="lg"
                  >
                    <Group position="center">
                      <Text>{k}</Text>
                      <Text>{genresData[k]}</Text>
                    </Group>
                  </Paper>
                </Grid.Col>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </>
      ))}
    </div>
  );
};

export default GenresInfo;
