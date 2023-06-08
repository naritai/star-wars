import { AppRouter } from 'app/providers/app-router';
import { Header } from 'widgets/header/ui/Header';
import cls from './App.module.scss';
import { CssBaseline } from '@mui/material';

export function App() {
  return (
    <section className={cls.App}>
      <CssBaseline />
      <Header />
      <main className="main-content">
        <AppRouter />
      </main>
    </section>
  );
}

export default App;
