import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollArea } from './components/ui/scroll-area';
import SetupPage from './pages/setup';
import HomePage from './pages/home';
import NewLogPage from './pages/new-log';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArea className='w-screen h-screen bg-gray-50'>
        <Routes>
          <Route path='/' element={<SetupPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/new-log' element={<NewLogPage />} />
        </Routes>
      </ScrollArea>
    </BrowserRouter>
  );
}
