import "./styles/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Game from "./Game";
import Container from "@mui/material/Container";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1200px" }}
      >
        <main>
          <Game />
        </main>
      </Container>
    </ThemeProvider>
  );
};