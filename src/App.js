import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainNav from './components/MainNav';
import Movies from './components/pages/Movies/Movies';
import Search from './components/pages/Search/Search';
import Series from './components/pages/Series/Series';

import Trending from './components/pages/Trending/Trending';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Container maxWidth="xl" sx={{ mt: `1rem` }}>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
        <MainNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
