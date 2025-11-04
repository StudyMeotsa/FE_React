import AppNavFooter from '@/components/AppNavFooter';
import { Outlet } from 'react-router';

export default function DefaultLayout() {
  return (
    <>
      {/*자식 요소를 가리킨다. 페이지 컴포넌트의 렌더링 위치를 결정해준다. */}
      <Outlet />
      <AppNavFooter />
    </>
  );
}
