import { type Studyroom } from '@/api/studyrooms';
import { createSession } from '@/api/studyRooomEvent';
import { Button } from '@/components/ui/button';
import { Calendar, Coffee } from 'lucide-react'; // 아이콘 추가
import { Link } from 'react-router-dom';
import * as S from './CardStyled';

type Props = {
  room: Studyroom;
};

export default function Card({ room }: Props) {
  // 진도율 계산 로직 (유지)
  const progressPercentage =
    room.totalSessions > 0
      ? Math.min(Math.round((room.sessionOrder / room.totalSessions) * 100), 100)
      : 0;

  // 세션 생성 핸들러 (유지)
  const handleCreateSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await createSession(room.groupId, {
        sessionOrder: room.sessionOrder + 1,
        title: room.name,
        startTime: room.startDay,
        endTime: room.endDay,
      });
      alert('새로운 세션이 생성되었습니다.');
    } catch (error) {
      console.error(error);
      alert('세션 생성 중 오류가 발생했습니다.');
    }
  };

  // 날짜 포맷팅 (YYYY-MM-DD -> YY.MM.DD)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.slice(2).replace(/-/g, '.');
  };

  return (
    <Link
      to={`/studyroomdetail/${room.groupId}`}
      style={{ textDecoration: 'none' }}>
      <S.Container>
        {/* 상단 헤더: 제목 + 배지 */}
        <S.Header>
          <S.Title>{room.name}</S.Title>
          <S.Badge>{Math.ceil(room.totalSessions / room.weekSession)}주 플랜</S.Badge>
        </S.Header>

        {/* 내부 아이보리색 박스 */}
        <S.InnerCard>
          <S.InfoList>
            {/* 날짜 정보 */}
            <S.InfoItem>
              <Calendar
                size={16}
                strokeWidth={2.5}
              />
              <span>
                {formatDate(room.startDay)} ~ {formatDate(room.endDay)}
              </span>
            </S.InfoItem>

            {/* 주간 세션 */}
            <S.InfoItem>
              <Coffee
                size={16}
                strokeWidth={3}
              />{' '}
              {/* 원두 아이콘 대신 커피 아이콘 사용 */}
              <span>
                주간 세션: {room.weekSession}회, 총 {room.totalSessions}회
              </span>
            </S.InfoItem>

            {/* 최소 공부량 */}
            <S.InfoItem>
              <Coffee
                size={16}
                strokeWidth={3}
              />
              <span>세션 최소 공부량: {room.studyTimeAim}h</span>
            </S.InfoItem>

            {/* 스터디 인원 */}
            <S.InfoItem>
              <Coffee
                size={16}
                strokeWidth={3}
              />
              <span>
                스터디 인원: {room.currentMember} / {room.maxMember}명
              </span>
            </S.InfoItem>

            {/* 현재 세션 */}
            <S.InfoItem>
              <Coffee
                size={16}
                strokeWidth={3}
              />
              <span>현재 세션: {room.sessionOrder}회차</span>
            </S.InfoItem>
          </S.InfoList>
        </S.InnerCard>

        {/* 커피 이미지 (InnerCard와 겹치게 배치) */}
        <S.ImageWrapper>
          <img
            src={room.coffeeImagePath}
            alt={room.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/default-coffee.png';
            }}
          />
        </S.ImageWrapper>

        {/* 하단 프로그레스 바 */}
        <S.ProgressContainer>
          <S.ProgressHeader>
            <span className='label'>Progress</span>
            <span className='value'>{progressPercentage}%</span>
          </S.ProgressHeader>

          <S.ProgressTrack>
            <S.ProgressFill $width={progressPercentage} />
          </S.ProgressTrack>

          {/* 세션 생성 버튼 (특수 조건) */}
          {!room.sessionOrder && (
            <div style={{ position: 'absolute', bottom: '50px', right: '20px', zIndex: 10 }}>
              <Button
                onClick={handleCreateSession}
                className='h-8 bg-[#2C2C2C] text-xs text-white hover:bg-black'>
                세션 생성
              </Button>
            </div>
          )}
        </S.ProgressContainer>
      </S.Container>
    </Link>
  );
}
