import { useNavigate } from 'react-router';

import Lamp from '../assets/lamp.png';
import Man from '../assets/man.png';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/studyroom');
  };

  return (
    <>
      <div className='topBackground'>
        <div className='intro_contain'>
          <img
            src={Lamp}
            className='lampImage'
          />
          <div className='intro_text'>
            <p className='intro_1'>님,</p>
            <p className='intro_1'>안녕하세요!</p>
            <p className='intro_2'>바로 시작해볼까요?</p>
          </div>

          <button
            className='text_but'
            onClick={handleClick}>
            공부하기 →
          </button>
        </div>
        <img
          src={Man}
          className='manImage'
          alt='Character'
        />
      </div>

      <div className='HomeInfo'>
        <div className='leftInfo'>
          <div className='todaystudy'>
            <p className='todaytitle'>오늘 공부량</p>
            <p className='todayclock'>12:00</p>
          </div>
          <div className='weekstudy'>
            <p className='weekstudytitle'>주간 공부량</p>
            <p className='todayclock'>37:30</p>
          </div>
        </div>
        <div className='rightInfo'>
          <div className='studygoal'>
            <p className='studygoaltitle'>과제 달성률</p>
            <p className='studygoalM'>11 / 12</p>
          </div>
          <div className='averagestudy'>
            <p className='averagetitle'>하루 평균 공부</p>
            <p className='averageclock'>03:00</p>
          </div>
        </div>
      </div>
    </>
  );
}
