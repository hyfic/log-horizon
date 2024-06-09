import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { invoke } from '@tauri-apps/api';
import { useNavigate } from 'react-router-dom';

export default function SetupPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setLoading(true);

    invoke('settings_is_first_time')
      .then((isFirstTime) => {
        if (!isFirstTime) {
          navigate('/home');
        }
      })
      .catch(() => {
        alert('Failed to load');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFormSubmit = (e: any) => {
    e?.preventDefault();

    setSubmitting(true);

    invoke('settings_add_data', {
      name,
      password,
    })
      .then(() => {
        navigate('/home');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold text-gray-900'>log@horizon</h2>
      <form
        onSubmit={handleFormSubmit}
        className='bg-white p-5 rounded-md shadow mt-5 w-1/2'
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter name'
          required
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mt-3'
          placeholder='Enter password'
          type='password'
          required
        />
        <Button
          className='w-full mt-5'
          disabled={name.trim().length == 0 || !password || submitting}
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
