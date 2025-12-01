import { useRef, useState, useEffect, useCallback } from 'react';
import Card from './Card';
import '@/components/StudyRoom/Card/CardCarouselCss.css';

export default function CardCarousel({ interval = 3000 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const cards = Array.from({ length: 5 }, (_, i) => <Card key={i} />);
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
