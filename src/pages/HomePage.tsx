import { useNavigate } from 'react-router';
import axios from 'axios';
import { axiosInstance } from '@/api/axiosinstance';
import { getHomeData } from '@/api/homepage';
import { useState, useEffect } from 'react';

import Lamp from '../assets/lamp.png';
import Man from '../assets/man.png';
import Woman from '../assets/woman.svg';
import './HomePage.css';

export default function HomePage() {
  const [homeData, setHomeData] = useState({
    name: '',
    sex: '',
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [meResponse, studyroomResponse] = await Promise.all([
          getHomeData(),
          // axiosInstance.get('/api/studyrooms'),
        ]);
        setHomeData({
          name: meResponse.name,
          sex: meResponse.sex,
          // 추가로 필요한 데이터 여기에 추가하고 homedata에 올려두기(2군데)
        });
      } catch (error) {
        console.error('Data Error:', error);
      }
    };

    fetchHomeData();
  }, []);

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
            <p className='intro_1'>{homeData.name}님,</p>
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
          src={homeData.sex === 'M' ? Man : Woman}
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
