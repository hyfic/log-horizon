import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HomePage() {
  useEffect(() => {
    invoke('settings_get_name').then(console.log);
  }, []);

  return (
    <section className='p-5'>
      <header className='flex items-center justify-between'>
        <h2 className='text-xl font-bold text-gray-900'>log@horizon</h2>
        <Link to='/new-log'>
          <Button size='sm'>Create new log</Button>
        </Link>
      </header>
    </section>
  );
}
