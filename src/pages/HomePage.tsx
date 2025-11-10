import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import './HomePage.css';
import Man from '../assets/man.png';
import Lamp from '../assets/lamp.png';

export default function HomePage() {
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
            <p className='todaytitle'>오늘 공부량</p>
            <p className='todayclock'>12:00</p>
          </div>
          <div className='weekstudy'>
            <p className='weekstudytitle'>주간 공부량</p>
          </div>
        </div>
        <div className='rightInfo'>
          <div className='studygoal'>
            <p className='studygoaltitle'>과제 달성률</p>
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
