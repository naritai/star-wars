import cls from './ErrorPage.module.scss';
import { classNames } from 'shared/lib/classNames';
import { ReportOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

interface ErrorPageProps { 
  className?: string; 
}

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}

export function ErrorPage({ className }: ErrorPageProps): JSX.Element {
  return (
    <section className={classNames(cls.errorpage, {}, [className])}>
      <Box component="span" sx={{ display: 'flex'}}>
        <ReportOutlined sx={{ fontSize: 70 }} color="error" />
        <Typography variant="h2">Oops!</Typography>
      </Box>

      <Box sx={centered}>
        <Typography variant="h4">Sorry, an unexpected error has occurred.</Typography>
        <Typography color="secondary" variant="h6" sx={{ flexGrow: 1 }} className={classNames(cls.link)}>
          Try reload the: {
            <Link to="/" reloadDocument={true}>
              Main Page
            </Link>
          }
        </Typography>
      </Box>
    </section>
  )
}