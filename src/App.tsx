import ProtectedLayout from '@/layouts/ProtectedLayout';
import PublicLayout from '@/layouts/PublicLayout';
import LoginPage from '@/pages/LoginPage';
import SessionDetail from '@/pages/SessionDetail';
import SignupPage from '@/pages/SiinupPage';
import TimerScreen from '@/pages/TimerScreen';
import TodoSession from '@/pages/TodoSession';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import CollectionPage from './pages/CollectionPage';
import EnterPage from './pages/EnterPage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import StudyRoomCreate from './pages/StudyRoomCreate';
import StudyRoomDetail from './pages/StudyRoomDetail';
import StudyRoomInfo from './pages/StudyRoomInfo';
import StudyRoomPage from './pages/StudyRoomPage';
import TodoPage from './pages/TodoPage';

function App() {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout />, // 전체적인 헤더/푸터 등 스타일 레이아웃
      children: [
        // ----------------------------------------------------------------
        // [그룹 1] 비로그인 유저만 접근 가능 (로그인, 회원가입)
        // ----------------------------------------------------------------
        {
          element: <PublicLayout />, // 🔒 이미 로그인했으면 못 들어옴
          children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
          ],
        },

        // ----------------------------------------------------------------
        // [그룹 2] 로그인한 유저만 접근 가능 (나머지 모든 기능)
        // ----------------------------------------------------------------
        {
          element: <ProtectedLayout />, // 🔒 토큰 없으면 로그인 페이지로 쫓겨남
          children: [
            { path: '/', element: <HomePage /> },
            { path: '/collection', element: <CollectionPage /> },
            { path: '/studyroom', element: <StudyRoomPage /> },
            { path: '/my', element: <MyPage /> },
            { path: '/studyroomCreate', element: <StudyRoomCreate /> },
            { path: '/studyroomdetail/:groupId', element: <StudyRoomDetail /> },
            { path: '/studyroomInfo/:groupId', element: <StudyRoomInfo /> },
            { path: '/enter', element: <EnterPage /> },
            {
              path: '/studyroom/:groupId/sessions/:sessionId/timer',
              element: <TimerScreen />,
            },
            { path: '/studyroom/:groupId/sessions/:sessionId/todo', element: <TodoSession /> },
            { path: '/session/:id', element: <SessionDetail /> },
            { path: '/TodoPage', element: <TodoPage /> },
          ],
        },
      ],
    },
    // (옵션) 404 페이지 처리가 필요하면 여기에 추가
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
