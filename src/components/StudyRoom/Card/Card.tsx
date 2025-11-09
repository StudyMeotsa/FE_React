import * as S from './CardStyled';
import Latte from '@/assets/Latte.png';

export default function Card() {
  return (
    <S.Container>
      <S.Top>
        <S.Title>알고리즘</S.Title>
        <S.Button>8주 플랜</S.Button>
      </S.Top>
      <S.Content>
        <S.ContentText>주간 세션: 2회 / 총 16회</S.ContentText>
        <S.ContentText>세션 최소 공부량: 2시간</S.ContentText>
        <S.ContentText>스터디 인원: 12명 / 20명</S.ContentText>
        <S.ContentText>현재 세션: 5회차</S.ContentText>
      </S.Content>
      <S.Image
        src={Latte}
        alt='Latte'
      />
      <S.ProgressContainer>
        <S.ProgressText>Progress</S.ProgressText>
        <S.Progress />
        <S.ProgressText style={{ alignSelf: 'flex-end', marginRight: '45px' }}>80%</S.ProgressText>
      </S.ProgressContainer>
    </S.Container>
  );
}
