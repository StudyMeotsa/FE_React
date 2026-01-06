import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  // 로컬 스토리지에서 토큰 확인
  const accessToken = localStorage.getItem('accessToken');

  // 1. 토큰이 없다면? -> 로그인 페이지로 쫓아냄 (replace로 뒤로가기 방지)
  if (!accessToken) {
    // alert('로그인이 필요한 서비스입니다.'); // 필요하면 주석 해제
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  // 2. 토큰이 있다면? -> 자식 컴포넌트(Outlet) 보여줌
  return <Outlet />;
}
