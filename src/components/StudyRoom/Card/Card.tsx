import { type Studyroom } from '@/api/studyrooms';
// createSession API가 정의된 경로로 import (경로는 실제 파일 위치에 맞게 수정해주세요)
import { createSession } from '@/api/studyRooomEvent';
import Latte from '@/assets/Latte.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import * as S from './CardStyled';

type Props = {
  room: Studyroom;
};

export default function Card({ room }: Props) {
  // 세션 생성 핸들러
  const handleCreateSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Link 컴포넌트의 클릭 이벤트 전파 방지 (상세 페이지 이동 막기)
    e.preventDefault();

    try {
      // 2. API 요청 바디 구성
      // 현재 room 정보를 기반으로 요청 데이터를 만듭니다.
      await createSession(room.groupId, {
        sessionOrder: 2,
        title: room.name, // name -> title
        startTime: room.startDay, // startDay -> startTime
        endTime: room.endDay, // endDay -> endTime
      });
    } catch (error) {
      console.error(error);
      alert('세션 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    // Link에 to 경로 템플릿 리터럴 수정 (백틱 ` 사용)
    <Link to={`/studyroomdetail/${room.groupId}`}>
      <S.Container>
        <S.Top>
          <S.Title>{room.name}</S.Title>
          <S.Button>{Math.ceil(room.totalSessions / room.weekSession)}주 플랜</S.Button>
        </S.Top>
        <S.Content>
          <S.ContentText>
            <span className='font-bold'>주간 세션:</span> {room.weekSession}회 / 총{' '}
            {room.totalSessions}회
          </S.ContentText>
          <S.ContentText>
            <span className='font-bold'>세션 최소 공부량:</span> {room.studyTimeAim}분
          </S.ContentText>
          <S.ContentText>
            <span className='font-bold'>스터디 인원:</span> {room.currentMember}명 /{' '}
            {room.maxMember}명
          </S.ContentText>
          <S.ContentText>
            <span className='font-bold'>현재 세션:</span> {room.sessionId}회차
          </S.ContentText>
        </S.Content>
        <S.Image
          src={Latte}
          alt='Latte'
        />
        <S.ProgressContainer>
          <S.ProgressText>Progress</S.ProgressText>
          <S.Progress />
          <S.ProgressText style={{ alignSelf: 'flex-end', marginRight: '45px' }}>
            80%
          </S.ProgressText>

          {/* 버튼에 onClick 이벤트 연결 */}
          {Boolean(!room.sessionOrder) && (
            <Button onClick={handleCreateSession}>세션 생성 (한번만 누르시오)</Button>
          )}
        </S.ProgressContainer>
      </S.Container>
    </Link>
  );
}
