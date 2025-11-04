import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import StudyRoomPage from './pages/StudyRoomPage';
import MyPage from './pages/MyPage';

function App() {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/collection', element: <CollectionPage /> },
        { path: '/studyroom', element: <StudyRoomPage /> },
        { path: '/my', element: <MyPage /> },
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
