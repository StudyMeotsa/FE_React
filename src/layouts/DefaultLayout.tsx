import AppNavFooter from '@/components/AppNavFooter';
import { Outlet } from 'react-router';

export default function DefaultLayout() {
  return (
    <div className='flex h-screen min-h-screen flex-col'>
      <main className='m-auto w-full max-w-lg flex-1 border border-black'>
        <Outlet />
      </main>
      <AppNavFooter />
    </div>
  );
}
