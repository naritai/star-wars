import { classNames } from 'shared/lib/classNames';
import cls from './Header.module.scss';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderProps { 
  className?: string; 
}

{/* <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
          </div>
        </div>
      </section>
    </nav> */}

export function Header({ className }: HeaderProps): JSX.Element {
  return (
    <header className={classNames(cls.header, {}, [className])}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
              <Link to="/characters" className={classNames(cls.link)}>
                <Typography color="secondary" variant="h6" sx={{ flexGrow: 1 }}>
                  Characters
                </Typography>
              </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}