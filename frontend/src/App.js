import './App.css';
import SearchBar from './components/searchBar';
import Cardd from './components/Display';import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Filter from './components/FilterCategory';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchBar/>
      {/* <Filter/> */}
       <Cardd/>    
     </ThemeProvider>
  );
}

export default App;

