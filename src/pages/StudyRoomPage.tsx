import WaveHeader from '@/components/WaveHeader';
import CardCarousel from '@/components/StudyRoom/Card/CardCarousel';
export default function StudyRoomPage() {
  return (
    <div>
      <WaveHeader />
      <div style={{ marginTop: '-20px' }}>
        <CardCarousel />
      </div>
    </div>
  );
}
