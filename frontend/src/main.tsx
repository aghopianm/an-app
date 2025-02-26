import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
