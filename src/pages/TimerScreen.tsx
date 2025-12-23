import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react'; // lucide-react 아이콘 사용 (없으면 생략 가능)
import { Button } from '@/components/ui/button';

type TimerStatus = 'idle' | 'running' | 'paused';

export default function TimerScreen() {
  const [time, setTime] = useState(0); // 총 경과 시간 (초)
  const [status, setStatus] = useState<TimerStatus>('idle');

  // 타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'running') {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status]);

  // 시간 포맷팅 (HH:MM:SS)
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // 종료 핸들러
  const handleSubmit = () => {
    console.log('서버로 데이터 전송:', time);
    setStatus('idle');
    setTime(0);
  };

  // 원형 프로그레스 계산
  const radius = 120; // 반지름
  const stroke = 12; // 테두리 두께
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // 1분(60초) 단위로 0~100% 진행. 60초가 되면 0으로 리셋되어 다시 시작
  const secondsInMinute = time % 60;
  const strokeDashoffset = circumference - (secondsInMinute / 60) * circumference;

  return (
    <div className='flex h-full flex-col items-center justify-between p-4'>
      <div className='w-full'>
        <div className='flex items-center justify-between text-[#191F28]'>
          <ArrowLeft className='h-6 w-6 cursor-pointer' />
          <h1 className='text-xl font-bold'>타이머</h1>
          <div className='w-6' /> {/* 레이아웃 밸런스용 빈 박스 */}
        </div>
        <div className='pt-20 text-center'>{status !== 'idle' && <RunningText />}</div>
      </div>

      {/* 메인 타이머 영역 */}
      <div className='relative flex items-center justify-center rounded-full bg-[#EFEAE4] p-1 shadow-2xs'>
        {/* SVG 원형 게이지 */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className='rotate-[-90deg] transition-all duration-1000 ease-linear'>
          {/* 배경 원 (회색 #D2D4D8) */}
          <circle
            stroke='#D2D4D8'
            fill='transparent'
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* 진행 원 (남색 #303A5B) */}
          <circle
            stroke='#303A5B'
            fill='#EBEBEB' // 원 안쪽 배경색 (이미지 참고)
            fillOpacity={0.5}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap='round'
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className='transition-all duration-1000 ease-linear'
          />
        </svg>

        {/* 중앙 시간 텍스트 */}
        <div className='absolute flex flex-col items-center justify-center'>
          <span className='font-mono text-2xl font-extrabold tracking-widest text-[#191F28]'>
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className='mb-20 flex gap-4'>
        {status === 'idle' ? (
          // 1. 초기 상태: 시작하기 버튼
          <CustomButton
            label='시작하기'
            onPress={() => setStatus('running')}
          />
        ) : (
          <>
            {/* 2. 진행중 또는 일시정지 상태 */}
            {status === 'running' ? (
              <CustomButton
                onPress={() => setStatus('paused')}
                label='일시정지'
              />
            ) : (
              <CustomButton
                label='이어하기'
                onPress={() => setStatus('running')}
              />
            )}

            <Button
              onClick={handleSubmit}
              className='rounded-4xl border-2 bg-[#8B6E5B] px-5 py-6 text-lg font-bold text-white hover:bg-[#7A5C4A]'>
              종료하기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
// 점(...)이 순서대로 움직이는 텍스트 컴포넌트
export const RunningText = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length < 3) return prev + '.';
        return ''; // 3개가 되면 초기화
      });
    }, 500); // 1초에 4단계 (빈값 -> . -> .. -> ...) 반복

    return () => clearInterval(interval);
  }, []);

  return (
    <span className='text-2xl font-semibold text-[#8B5E3C]'>
      스터디 진행중
      <span className='inline-block w-8 text-left'>{dots}</span>
    </span>
  );
};

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}

export function CustomButton({ label, onPress }: CustomButtonProps) {
  return (
    <Button
      onClick={onPress}
      className='rounded-4xl border-2 border-[#6D5246] bg-transparent px-5 py-6 text-lg font-bold text-[#6D5246] hover:bg-[#6D5246]/10'>
      {label}
    </Button>
  );
}
