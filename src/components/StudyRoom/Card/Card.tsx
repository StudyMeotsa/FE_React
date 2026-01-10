import { type Studyroom } from '@/api/studyrooms';
import { createSession } from '@/api/studyRooomEvent';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import * as S from './CardStyled';

type Props = {
  room: Studyroom;
};

export default function Card({ room }: Props) {
  // 진도율 계산 로직: (현재 세션 순서 / 전체 세션 수) * 100
  const progressPercentage = room.totalSessions > 0 
    ? Math.min(Math.round((room.sessionOrder / room.totalSessions) * 100), 100) 
    : 0;

  // 세션 생성 핸들러
  const handleCreateSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 부모 Link로의 클릭 이벤트 전파 방지

    try {
      // 다음 회차(sessionOrder + 1) 생성을 시도한다고 가정
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

  return (
    <Link to={`/studyroomdetail/${room.groupId}`} style={{ textDecoration: 'none' }}>
      <S.Container>
        <S.Top>
          <S.Title>{room.name}</S.Title>
          <S.Button>{Math.ceil(room.totalSessions / room.weekSession)}주 플랜</S.Button>
        </S.Top>

        <S.Content>
          <S.ContentText>
            <span className='font-bold'>주간 세션:</span> {room.weekSession}회 / 총 {room.totalSessions}회
          </S.ContentText>
          <S.ContentText>
            <span className='font-bold'>세션 최소 공부량:</span> {room.studyTimeAim}분
          </S.ContentText>
          <S.ContentText>
            <span className='font-bold'>스터디 인원:</span> {room.currentMember}명 / {room.maxMember}명
          </S.ContentText>
          <S.ContentText>
            <span className='font-bold'>현재 세션:</span> {room.sessionOrder}회차
          </S.ContentText>
        </S.Content>

        {/* 백엔드 API에서 제공하는 coffeeImagePath 사용 */}
        <S.Image
          src={room.coffeeImagePath}
          alt={room.name}
          onError={(e) => {
            // 이미지 로드 실패 시 대체 이미지 처리 (필요시)
            (e.currentTarget as HTMLImageElement).src = '/images/default-coffee.png';
          }}
        />

        <S.ProgressContainer>
          <S.ProgressText>Progress</S.ProgressText>
          
          <S.ProgressTrack>
            {/* 계산된 퍼센트를 스타일드 컴포넌트에 prop으로 전달 */}
            <S.ProgressFill $width={progressPercentage} />
          </S.ProgressTrack>
          
          <S.ProgressText style={{ alignSelf: 'flex-end', marginRight: '45px' }}>
            {progressPercentage}%
          </S.ProgressText>

          {/* sessionOrder가 0이거나 데이터가 없는 특수 상황에서만 생성 버튼 노출 */}
          {!room.sessionOrder && (
            <Button 
              onClick={handleCreateSession} 
              className="mt-2 bg-[#ac7349] hover:bg-[#8d5d3a] text-white"
            >
              세션 생성 (한번만 누르시오)
            </Button>
          )}
        </S.ProgressContainer>
      </S.Container>
    </Link>
  );
}