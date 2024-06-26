import { PasswordStore } from '@/store/password.store';
import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { invoke } from '@tauri-apps/api';

interface Props {
  children: React.ReactNode;
}

export const PasswordWrapper: React.FC<Props> = (props) => {
  const passwordStore = useStore(PasswordStore);

  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e?.preventDefault();

    invoke('settings_validate_password', {
      password,
    })
      .then((valid) => {
        if (valid) {
          passwordStore.setPassword(password);
        } else {
        }
      })
      .catch(() => {})
      .finally(() => {
        setPassword('');
      });
  };

  return passwordStore.password == null ? (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <h2 className='text-xl font-bold'>log@horizon</h2>

      <form onSubmit={handleSubmit}>
        <Input
          className='w-fit mt-3'
          placeholder='Enter password'
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' className='mt-3 w-full' disabled={!password}>
          Start logging
        </Button>
      </form>
    </div>
  ) : (
    props.children
  );
};
