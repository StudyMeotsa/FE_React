import WaveHeader from '@/components/WaveHeader';
import CardCarousel from '@/components/StudyRoom/Card/CardCarousel';
import PlusModal from '@/components/StudyRoom/PlusModal';
import styled from 'styled-components';

const TextContainer = styled.div`
  margin-top: -2.7rem;
  align-items: center;
`;

export default function StudyRoomPage() {
  return (
    <div>
      <WaveHeader>
        <div>
          <TextContainer>
            <p style={{ fontSize: '22px', fontWeight: 'Bold' }}>나의 스터디룸</p>
            <p style={{ marginLeft: '0.35rem' }}>10월 27일 월요일</p>
          </TextContainer>
          <PlusModal />
        </div>
      </WaveHeader>
      <div style={{ marginTop: '-20px' }}>
        <CardCarousel />
      </div>
    </div>
  );
}
