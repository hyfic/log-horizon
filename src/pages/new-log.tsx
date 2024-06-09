import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewLogPage() {
  const [content, setContent] = useState('');

  const handleFormSubmit = (e: any) => {
    e?.preventDefault();
  };

  return (
    <section className='p-5'>
      <header className='flex items-center justify-between'>
        <h2 className='text-xl font-bold text-gray-900'>log@horizon</h2>
        <Link to='/'>
          <Button size='sm'>Go Home</Button>
        </Link>
      </header>

      <form>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='mt-5 h-[75vh] text-base'
        />
        <div className='flex flex-row-reverse'>
          <Button className='mt-3'>create log</Button>
        </div>
      </form>
    </section>
  );
}
