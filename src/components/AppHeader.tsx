import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Coffee, Home, Layers, LogOut, Menu, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const navRoute = [
    { label: '홈', path: '/', icon: <Home size={20} /> },
    { label: '스터디룸', path: '/studyroom', icon: <Coffee size={20} /> },
    { label: '컬렉션', path: '/collection', icon: <Layers size={20} /> },
    { label: '내 프로필', path: '/my', icon: <User size={20} /> },
  ];

  // 로그아웃 핸들러 (예시)
  const handleLogout = () => {
    // 토큰 삭제 로직 등...
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    // 모바일 뷰포트(max-w-lg)에 맞춘 상단 고정 헤더
    <header className='fixed top-0 z-50 flex h-14 w-full max-w-lg items-center justify-between bg-[#C9ADA7] px-4 backdrop-blur-md'>
      {/* 왼쪽: 로고 */}
      <Link
        to='/'
        className='flex items-center gap-2'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#4B3621] text-white'>
          <Coffee size={16} />
        </div>
        <span className='font-serif text-lg font-bold tracking-tight text-[#4B3621]'>
          STUDY CAFE
        </span>
      </Link>

      {/* 오른쪽: 햄버거 메뉴 (Sheet Trigger) */}
      <Sheet>
        <SheetTrigger asChild>
          <button className='rounded-full p-2 text-[#4B3621] transition-colors hover:bg-[#4B3621]/10 active:scale-95'>
            <Menu size={24} />
          </button>
        </SheetTrigger>

        {/* 사이드바 내용 */}
        <SheetContent
          side='right'
          className='w-[300px] border-l border-[#EAE0D5] bg-[#FDFBF7] p-0 sm:max-w-xs'>
          {/* 헤더: 사용자 정보 등 */}
          <SheetHeader className='border-b border-[#EAE0D5] bg-[#4B3621] px-6 py-8 text-left'>
            <SheetTitle className='flex items-center gap-2 font-serif text-xl text-[#FDFBF7]'>
              <Coffee className='text-[#D4A373]' />
              Menu
            </SheetTitle>
            <p className='text-sm text-[#D4A373]/80'>오늘도 열공하세요, 회원님!</p>
          </SheetHeader>

          {/* 메뉴 리스트 */}
          <div className='flex flex-col gap-2 p-6'>
            {navRoute.map((nav) => {
              const isActive = location.pathname === nav.path;
              return (
                <SheetClose
                  key={nav.path}
                  asChild>
                  <Link
                    to={nav.path}
                    className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-[#4B3621] text-white shadow-md'
                        : 'text-[#5A4838] hover:bg-[#EAE0D5]/50'
                    }`}>
                    <span
                      className={`${isActive ? 'text-[#D4A373]' : 'text-[#8B6E5B] group-hover:text-[#4B3621]'}`}>
                      {nav.icon}
                    </span>
                    <span className='font-medium'>{nav.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>

          {/* 하단 로그아웃 */}
          <div className='absolute bottom-8 left-0 w-full px-6'>
            <SheetClose asChild>
              <Button
                variant='ghost'
                onClick={handleLogout}
                className='w-full justify-start gap-3 rounded-xl py-6 text-[#8B6E5B] hover:bg-[#EAE0D5]/50 hover:text-[#4B3621]'>
                <LogOut size={20} />
                로그아웃
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
