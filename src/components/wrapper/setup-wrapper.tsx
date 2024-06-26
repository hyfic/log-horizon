import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useStore } from 'zustand';
import { PasswordStore } from '@/store/password.store';

interface Props {
  children: React.ReactNode;
}

export const SetupWrapper: React.FC<Props> = (props) => {
  const passwordStore = useStore(PasswordStore);

  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setLoading(true);
    setIsFirstTime(true);

    invoke('settings_is_first_time')
      .then((val: any) => setIsFirstTime(val))
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e: any) => {
    e?.preventDefault();

    invoke('settings_add_data', {
      name,
      password,
    })
      .then(() => {
        // passwordStore.setPassword(password);
        setIsFirstTime(false);
      })
      .catch(() => {});
  };

  return isFirstTime ? (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <h2 className='text-xl font-bold'>log@horizon</h2>

      <form onSubmit={handleSubmit}>
        <Input
          className='w-fit mt-5'
          placeholder='Enter name'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className='w-fit mt-3'
          placeholder='Enter password'
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type='submit'
          className='mt-3 w-full'
          disabled={!name || !password}
        >
          Start logging
        </Button>
      </form>
    </div>
  ) : (
    props.children
  );
};
