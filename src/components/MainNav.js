import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const changePage = () => {
      if (value === 0) navigate('/');
      else if (value === 1) navigate('/movies');
      else if (value === 2) navigate('/series');
      else if (value === 3) navigate('/search');
    };
    changePage();
  }, [value, navigate]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{
        background: '#9f5eff',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        boxShadow: `0px -3px 8px #000`,
        height: `60px`,
        zIndex: 100,
        '& .MuiBottomNavigationAction-root, .Mui-selected, svg': {
          color: 'black',
        },
        '& .Mui-selected, .Mui-selected > svg': {
          color: 'white',
          textShadow: `1px 1px 4px #000`,
        },
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="В тренде" icon={<WhatshotIcon />} />
      <BottomNavigationAction label="Фильмы" icon={<MovieIcon />} />
      <BottomNavigationAction label="Сериалы" icon={<TvIcon />} />
      <BottomNavigationAction label="Поиск" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}
