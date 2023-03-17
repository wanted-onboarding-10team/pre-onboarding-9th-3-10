import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import router from 'router';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from 'styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
