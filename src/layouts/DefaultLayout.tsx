import AppHeader from '@/components/AppHeader'; // 경로에 맞게 수정
import { Outlet } from 'react-router';

export default function DefaultLayout() {
  return (
    <div className='flex min-h-screen w-full justify-center bg-[#F2F2F2]'>
      {/* 모바일 컨테이너 제한 */}
      <div className='relative flex h-full min-h-screen w-full max-w-lg flex-col bg-[#FDFBF7] shadow-xl'>
        {/* 1. 상단 헤더 (햄버거 메뉴 포함) */}
        <AppHeader />

        {/* 2. 메인 콘텐츠 */}
        {/* 헤더 높이(h-14 = 3.5rem)만큼 상단 여백을 줘서 내용이 가려지지 않게 함 */}
        <main className='flex-1 pt-14'>
          <Outlet />
        </main>

        {/* Footer는 이제 삭제되었습니다. */}
      </div>
    </div>
  );
}
