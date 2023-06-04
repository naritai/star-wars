import { AppRouter } from 'app/providers/AppRouter';
import { Header } from 'widgets/Header/ui/Header';
import cls from './App.module.scss';

export function App() {
  return (
    <div className={cls.App}>
      <Header />
      <main className='main-content'>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
