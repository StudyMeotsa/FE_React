import { Link } from 'react-router';

export default function AppNavFooter() {
  const navRoute = [
    { label: '홈', path: '/' },
    { label: '스터디룸', path: '/studyroom' },
    { label: '컬렉션', path: '/collection' },
    { label: '내 프로필', path: '/my' },
  ];

  return (
    <div className='fixed right-0 bottom-0 left-0 mx-auto flex w-full max-w-lg justify-evenly gap-10 border border-black bg-white p-2'>
      {navRoute.map((nav) => (
        <Link
          key={nav.path}
          to={nav.path}>
          <div>{nav.label}</div>
        </Link>
      ))}
    </div>
  );
}
