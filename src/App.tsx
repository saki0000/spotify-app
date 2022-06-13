import "./App.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import Auth from "./component/Auth";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          yellow: [
            "#FFF9DB",
            "#FFF3BF",
            "#FFEC99",
            "#FFE066",
            "#FFD43B",
            "#FCC419",
            "#FAB005",
            "#F59F00",
            "#F08C00",
            "#E67700",
          ],
        },
      }}
    >
      <Auth />
    </MantineProvider>
  );
}

export default App;
