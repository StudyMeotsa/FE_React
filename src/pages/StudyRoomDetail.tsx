import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveHeader from '@/components/WaveHeader';
import styled from 'styled-components';
import './StudyRoomDetail.css';
import info from '../assets/info.svg';
import back from '../assets/back.svg';
// import detailman from '../assets/detailman.svg';
import sample1 from '../assets/sample1.svg';
import sample2 from '../assets/sample2.svg';
import sample3 from '../assets/sample3.svg';

const TextContainer = styled.div`
  margin-top: -2.7rem;
  align-items: center;
`;

function NoticeItem({ noticetitle, noticecontent }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotice = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='noticecontainers'>
      <div
        className={`noticecontainer ${isOpen ? 'active' : ''}`}
        onClick={toggleNotice}
        style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        {isOpen ? '🔽' : '▶️'}
        {noticetitle}
      </div>

      {isOpen && <div className='noticecontent'>{noticecontent}</div>}
    </div>
  );
}

export default function StudyRoomDetail() {
  const navigate = useNavigate();
  const infoButtonClick = () => {
    navigate('/studyroominfo');
  };
  const backButtonClick = () => {
    navigate('/studyroom');
  };
  const todoButtonClick = () => {
    navigate('/todo');
  };

  return (
    <div>
      <WaveHeader>
        <div>
          <TextContainer>
            <p style={{ fontSize: '22px', fontWeight: 'Bold' }}>알고리즘 스터디</p>
            <p style={{ marginLeft: '0.35rem' }}>10월 27일 월요일</p>
          </TextContainer>
          <button onClick={infoButtonClick}>
            <img
              className='info'
              src={info}
            />
          </button>

          <button onClick={backButtonClick}>
            <img
              className='infoback'
              src={back}
            />
          </button>
        </div>
      </WaveHeader>
      <div style={{ marginTop: '-20px' }}></div>

      <div className='buttoncontainers'>
        <button className='stamp'>스탬프</button>
        <button
          onClick={todoButtonClick}
          className='todo'>
          세션 할 일
        </button>
        <button className='study'>공부하기</button>
      </div>

      <NoticeItem
        noticetitle='공지글 축소 상태입니다.'
        noticecontent='공지글 전체 확장입니다. 누르면 그 자리에서 그대로 전체 길이 확장되어 보입니다. 확장된상태에서 다시 누르면 이전처럼 다시 축소됩니다.'
      />

      <div className='tablecontainers'>
        {/* <div>
          <img
            src={detailman}
            alt={detailman}
          />
          <div>안녕이1</div>
        </div> */}

        <img
          className='sample'
          src={sample1}
          alt='sample1'
        />
        <img
          className='sample'
          src={sample2}
          alt='sample2'
        />
        <img
          className='sample'
          src={sample3}
          alt='sample3'
        />
      </div>
    </div>
  );
}
