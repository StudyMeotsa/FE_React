import WaveHeader from '@/components/WaveHeader';
import CardCarousel from '@/components/StudyRoom/Card/CardCarousel';
import PlusModal from '@/components/StudyRoom/PlusModal';

export default function StudyRoomPage() {
  return (
    <div>
      <WaveHeader />
      <PlusModal />
      <div style={{ marginTop: '-20px' }}>
        <CardCarousel />
      </div>
    </div>
  );
}
