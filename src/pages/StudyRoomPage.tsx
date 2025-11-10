import WaveHeader from '@/components/WaveHeader';
import CardCarousel from '@/components/StudyRoom/Card/CardCarousel';
import PlusModal from '@/components/StudyRoom/PlusModal';

export default function StudyRoomPage() {
  return (
    <div>
      <WaveHeader>
        <div>
          <>
            <p>나의 스터디룸</p>
            <p>10월 27일 월요일</p>
          </>
          <PlusModal />
        </div>
      </WaveHeader>
      <div style={{ marginTop: '-20px' }}>
        <CardCarousel />
      </div>
    </div>
  );
}
