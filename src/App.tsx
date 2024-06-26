import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollArea } from './components/ui/scroll-area';
import SetupPage from './pages/setup';
import HomePage from './pages/home';
import NewLogPage from './pages/new-log';
import { SetupWrapper } from './components/wrapper/setup-wrapper';
import { PasswordWrapper } from './components/wrapper/password-wrapper';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArea className='w-screen h-screen'>
        <SetupWrapper>
          <PasswordWrapper>
            <Routes>
              <Route path='/' element={<SetupPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/new-log' element={<NewLogPage />} />
            </Routes>
          </PasswordWrapper>
        </SetupWrapper>
      </ScrollArea>
    </BrowserRouter>
  );
}
