import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Card from './Card';
import '@/components/StudyRoom/Card/CardCarouselCss.css';
import { studyroomList, type Studyroom } from '@/api/studyrooms';

export default function CardCarousel({ interval = 3000 }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [rooms, setRooms] = useState<Studyroom[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try{
        const data = await studyroomList();
        setRooms(data);
        setIndex(0);
      } catch (e){
        console.error('스터디룸 목록 조회 실패:', e);
      }
    })();
  }, []);

  const cards = useMemo(() => rooms.map((room) => <Card key = {room.groupId} room={room} />), [rooms]);
  const count = cards.length;

  const clamp = useCallback(
    (i: number) => (i + count) % count,
    [count] // count가 바뀔 때만 함수를 새로 만듦
  );

  const scrollTo = useCallback((i: number, behavior: ScrollBehavior = 'smooth') => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement;
    if (child) child.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
    setIndex(i);
  }, []);

  // 수동 스크롤 시 index 동기화
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const child = el.children[0] as HTMLElement;
      if (!child) return;

      const cardWidth = child.clientWidth + 16; // gap 16px 고려
      const i = Math.round(el.scrollLeft / cardWidth);
      if (i !== index) setIndex(i);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [index]);

  // 자동 슬라이드
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || count <= 1) return;

    const id = setInterval(() => {
      scrollTo(clamp(index + 1));
    }, interval);

    return () => clearInterval(id);
  }, [paused, index, count, interval, scrollTo, clamp]);

  if (count === 0) {
    return <div className="carousel-container">스터디룸이 없어요.</div>;
  }

  return (
    <div
      className='carousel-container'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}>
      {/* 카드 트랙 */}
      <div
        className='carousel-wrapper'
        ref={trackRef}>
        {cards.map((card, i) => (
          <div
            className='carousel-item'
            key={i}>
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
