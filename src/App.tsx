import SessionDetail from '@/pages/SessionDetail';
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

function App() {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/collection', element: <CollectionPage /> },
        { path: '/studyroom', element: <StudyRoomPage /> },
        { path: '/my', element: <MyPage /> },
        { path: '/studyroomCreate', element: <StudyRoomCreate /> },
        { path: '/studyroomdetail', element: <StudyRoomDetail /> },
        { path: '/studyroominfo', element: <StudyRoomInfo /> },
        { path: '/enter', element: <EnterPage /> },
        { path: '/timer', element: <TimerScreen /> },
        { path: '/todoSession', element: <TodoSession /> },
        { path: '/session/:id', element: <SessionDetail /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
