import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './MainNav.module.css';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const changePage = () => {
      if (value === 0) navigate('/');
      else if (value === 1) navigate('/movies');
      else if (value === 2) navigate('/series');
      else if (value === 3) navigate('/search');
      else if (value === 4) navigate('/test');
    };
    changePage();
  }, [value, navigate]);

  return (
    <BottomNavigation
      showLabels
      className={styles.nav}
      value={value}
      sx={{
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
      <BottomNavigationAction
        label="Тренды"
        icon={<WhatshotIcon fontSize="small" />}
      />
      <BottomNavigationAction
        label="Фильмы"
        icon={<MovieIcon fontSize="small" />}
      />
      <BottomNavigationAction
        label="Сериалы"
        icon={<TvIcon fontSize="small" />}
      />
      <BottomNavigationAction
        label="Поиск"
        icon={<SearchIcon fontSize="small" />}
      />
    </BottomNavigation>
  );
}
