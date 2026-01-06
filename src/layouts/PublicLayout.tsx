import { Navigate, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  const accessToken = localStorage.getItem('accessToken');

  // 1. 이미 로그인이 되어 있다면? -> 메인 페이지('/')로 튕겨냄
  if (accessToken) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  // 2. 로그인이 안 되어 있다면? -> 로그인/회원가입 페이지 보여줌
  return <Outlet />;
}
