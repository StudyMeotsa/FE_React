import { endTimer } from '@/api/studyRoomSubEvent'; // API import 경로 확인
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // react-router-dom 사용 권장

type TimerStatus = 'idle' | 'running' | 'paused';

export default function TimerScreen() {
  const navigate = useNavigate();
  // 1. URL 파라미터에서 ID 추출
  const { groupId, sessionId } = useParams<{ groupId: string; sessionId: string }>();

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

  // 시간 포맷팅 (화면 표시용 HH:MM:SS)
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // API 전송용 날짜 포맷팅 (yyyy-MM-dd'T'HH:mm:ss)
  const formatDateTimeForApi = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // 2. 종료 핸들러 (API 호출)
  const handleSubmit = async () => {
    if (!groupId || !sessionId) {
      alert('잘못된 접근입니다.');
      return;
    }

    // 0초면 전송하지 않음 (선택 사항)
    if (time === 0) {
      alert('공부 시간이 0초입니다.');
      return;
    }

    try {
      setStatus('paused'); // 일단 멈춤

      const now = new Date();
      const body = {
        time: time, // 초 단위
        createdAt: formatDateTimeForApi(now),
      };

      console.log('서버로 데이터 전송:', body);

      // API 호출
      await endTimer(Number(groupId), Number(sessionId), body);

      alert('공부가 종료되었습니다! 고생하셨어요 👏');

      // 성공 시 뒤로가기 혹은 목록으로 이동
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('데이터 전송에 실패했습니다.');
      setStatus('running'); // 실패 시 다시 진행 상태로 복구? (선택)
    }
  };

  // 원형 프로그레스 계산
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const secondsInMinute = time % 60;
  const strokeDashoffset = circumference - (secondsInMinute / 60) * circumference;

  return (
    <div className='flex h-full flex-col items-center justify-between p-4'>
      <div className='w-full'>
        <div className='flex items-center justify-between text-[#191F28]'>
          <ArrowLeft
            className='h-6 w-6 cursor-pointer'
            onClick={() => navigate(-1)}
          />
          <h1 className='text-xl font-bold'>타이머</h1>
          <div className='w-6' />
        </div>
        <div className='pt-20 text-center'>{status !== 'idle' && <RunningText />}</div>
      </div>

      {/* 메인 타이머 영역 */}
      <div className='relative flex items-center justify-center rounded-full bg-[#EFEAE4] p-1 shadow-2xs'>
        <svg
          height={radius * 2}
          width={radius * 2}
          className='rotate-[-90deg] transition-all duration-1000 ease-linear'>
          <circle
            stroke='#D2D4D8'
            fill='transparent'
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke='#303A5B'
            fill='#EBEBEB'
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

        <div className='absolute flex flex-col items-center justify-center'>
          <span className='font-mono text-2xl font-extrabold tracking-widest text-[#191F28]'>
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className='mb-20 flex gap-4'>
        {status === 'idle' ? (
          <CustomButton
            label='시작하기'
            onPress={() => setStatus('running')}
          />
        ) : (
          <>
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

// ... (RunningText, CustomButton 컴포넌트는 기존과 동일)
export const RunningText = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length < 3) return prev + '.';
        return '';
      });
    }, 500);

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
