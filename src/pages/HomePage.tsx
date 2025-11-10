import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './HomePage.css';
import Man from '../assets/man.png';
import Lamp from '../assets/lamp.png';

function HomePage() {
  const Box = styled.div`
    border-radius: 12px;
    padding: 16px;
  `;

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
            <p className='intro_1'>000님,</p>
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
        />
      </div>

      <div className='HomeInfo'>
        <div className='leftInfo'>
          <div className='todaystudy'>
            <p>오늘 공부량</p>
            <p>12:00</p>
          </div>
          <div className='weekstudy'>
            <p>주간공부량</p>
            <div className=''>
              <p>9월 4주</p>
              <img />
            </div>
          </div>
        </div>
        <div className='rightInfo'>
          <div className='studygoal'>
            <p>과제달성률</p>
          </div>
          <div className='averagestudy'>
            <p>하루평균공부</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
