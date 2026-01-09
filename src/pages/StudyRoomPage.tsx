import WaveHeader from '@/components/WaveHeader';
import CardCarousel from '@/components/StudyRoom/Card/CardCarousel';
import PlusModal from '@/components/StudyRoom/PlusModal';
import styled from 'styled-components';

const TextContainer = styled.div`
  margin-top: -2.7rem;
  align-items: center;
`;

export default function StudyRoomPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return (
    <div>
      <WaveHeader>
        <div>
          <TextContainer>
            <p style={{ fontSize: '22px', fontWeight: 'Bold' }}>나의 스터디룸</p>
            <p style={{ marginLeft: '0.35rem' }}>{year}년 {month}월 {day}일</p>
          </TextContainer>
          <PlusModal />
        </div>
      </WaveHeader>
      <div style={{ marginTop: '-20px', marginBottom: '2rem' }}>
        <CardCarousel />
      </div>
    </div>
  );
}
