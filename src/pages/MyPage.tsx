import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Label } from '@/components/ui/label'; // shadcn label 컴포넌트 경로 확인 필요
import { getMyInfo } from '@/api/auth';

export default function MyPage() {
  // 실제 데이터는 props나 API를 통해 받아올 수 있습니다.
  const [info, setInfo] = useState({
    name: '',
    email: '',
    sex: '',
  });

  useEffect(() => {
    getMyInfo().then((res) => {
      setInfo({
        name: res.name,
        email: res.email,
        sex: res.sex,
      });
    });
  }, []);

  // 스터디 목적인데 일단 이름API로 연결
  const [goalInfo, setGoalInfo] = useState({
    goal: '',
  });

  useEffect(() => {
    getMyInfo().then((res) => {
      setGoalInfo({
        goal: res.name,
      });
    });
  }, []);

  const userInfo = {
    name: info.name,
    email: info.email,
    sex: info.sex,
    studyGoal: goalInfo.goal,
  };

  // 정보 항목을 표시하는 재사용 가능한 컴포넌트
  const InfoItem = ({
    label,
    value,
    className = '',
  }: {
    label: string;
    value: string;
    className?: string;
  }) => (
    <div>
      <Label className='mb-2 block text-base font-bold'>{label}</Label>
      <div className={`rounded-lg bg-[#D9D9D9] p-4 font-medium text-gray-800 ${className}`}>
        {value}
      </div>
    </div>
  );

  return (
    <div className='flex min-h-screen justify-center bg-[#F3F4F6] p-6'>
      <div className='w-full max-w-md'>
        {/* 헤더 */}
        <header className='mb-10 flex items-center justify-between'>
          <h1 className='text-2xl font-extrabold text-black'>마이페이지</h1>
          <Bell className='h-6 w-6 cursor-pointer text-gray-400' />
        </header>

        {/* 프로필 이미지 영역 */}
        <div className='mb-10 flex justify-center'>
          <div className='h-32 w-32 rounded-full bg-gray-600'>
            {/* 실제 이미지가 있다면 img 태그를 사용하세요 */}
            {/* <img src="/path/to/image.jpg" alt="프로필" className="w-full h-full rounded-full object-cover" /> */}
          </div>
        </div>

        {/* 정보 섹션들 */}
        <div className='space-y-6'>
          <InfoItem
            label='이름'
            value={userInfo.name}
          />
          <InfoItem
            label='이메일'
            value={userInfo.email}
          />
          <InfoItem
            label='성별'
            value={userInfo.sex}
          />
          {/* 스터디 목적은 내용이 길어질 수 있으므로 높이를 더 줍니다 */}
          <InfoItem
            label='스터디 목적'
            value={userInfo.studyGoal}
            className='pb-12'
          />
        </div>
      </div>
    </div>
  );
}
