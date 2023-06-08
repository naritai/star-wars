import { classNames } from 'shared/lib/classNames';
import cls from './Header.module.scss';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Slogan } from './Slogan';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps): JSX.Element {
  return (
    <header className={classNames(cls.header, {}, [className])}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: '#000' }}>
          <Toolbar>
            <Link to="/characters" className={classNames(cls.link)}>
              <Typography
                fontWeight="bold"
                color="primary"
                variant="h6"
                sx={{ flexGrow: 1 }}
              >
                Characters
              </Typography>
            </Link>
            <Slogan />
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}
