import { getMyInfo, type MyInfoResponse } from '@/api/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Lamp from '../assets/lamp.png';
import Man from '../assets/man.png';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [me, setMe] = useState<MyInfoResponse>();

  // 랜덤 명언 (새로고침 할 때마다 바뀌는 척)
  const quote = '꿈을 꾸는 것이 아니라,\n꿈을 실행하는 하루가 되길.';

  const handleClick = () => {
    navigate('/studyroom');
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getMyInfo();
        setMe(data);
      } catch (error) {
        console.error('정보 조회 실패:', error);
      }
    };
    fetchMe();
  }, []);

  return (
    <>
      <div className='topBackground'>
        <div className='intro_contain'>
          <img
            src={Lamp}
            className='lampImage'
            alt='lamp'
          />
          <div className='intro_text'>
            <p className='intro_1'>{me?.name || '게스트'}님,</p>
            <p className='intro_1'>안녕하세요!</p>
            <p className='intro_2'>바로 시작해볼까요?</p>
          </div>
        </div>
        <img
          src={Man}
          className='manImage'
          alt='Character'
        />
      </div>

      {/* ▼▼▼ 여기부터 싹 바꿨습니다 ▼▼▼ */}
      <div className='HomeContent'>
        {/* 1. 화려한 라이브 현황 카드 */}
        <div
          className='LiveCard'
          onClick={handleClick}>
          <div className='LiveCard_Header'>
            <span className='LiveBadge'>LIVE 🔴</span>
            <span className='LiveCount'>1,240명</span>
          </div>
          <p className='LiveText'>
            지금 열정적으로
            <br />
            공부 중인 동료들 🔥
          </p>
          <div className='LiveAvatars'>
            {/* 더미 아바타 원들 */}
            <div
              className='Avatar'
              style={{ background: '#FFD700' }}>
              🦁
            </div>
            <div
              className='Avatar'
              style={{ background: '#FF6B6B' }}>
              🐯
            </div>
            <div
              className='Avatar'
              style={{ background: '#4ECDC4' }}>
              🦊
            </div>
            <div className='Avatar More'>+99</div>
          </div>
        </div>

        {/* 3. 명언 카드 (공간 채우기 용) */}
        <div className='QuoteCard'>
          <p className='QuoteText'>"{quote}"</p>
          <p className='QuoteAuthor'>- 오늘의 한마디</p>
        </div>
      </div>
    </>
  );
}
