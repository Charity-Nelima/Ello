import React from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import Cardd from './components/Display';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Mulish',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchBar />
        <Cardd />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
