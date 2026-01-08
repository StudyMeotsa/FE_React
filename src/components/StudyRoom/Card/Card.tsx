import * as S from './CardStyled';
import Latte from '@/assets/Latte.png';
import { Link } from 'react-router-dom';
import type { Studyroom } from '@/api/studyrooms';

type Props = {
  room: Studyroom;
};

export default function Card({room}: Props) {

  return (
    <Link to='/studyroomdetail/${room.groupId}'>
      <S.Container>
        <S.Top>
          <S.Title>{room.name}</S.Title>
          <S.Button>{Math.ceil(room.totalSessions / room.weekSession)}주 플랜</S.Button>
        </S.Top>
        <S.Content>
          <S.ContentText>주간 세션: {room.weekSession}회 / 총 {room.totalSessions}회</S.ContentText>
          <S.ContentText>세션 최소 공부량: {room.studyTimeAim}분</S.ContentText>
          <S.ContentText>스터디 인원: {room.currentMember}명 / {room.maxMember}명</S.ContentText>
          <S.ContentText>현재 세션: {room.sessionId}회차</S.ContentText>
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
        </S.ProgressContainer>
      </S.Container>
    </Link>
  );
}
