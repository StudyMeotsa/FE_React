import { useState } from 'react';
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
import stamp from '../assets/stamp.svg';

const TextContainer = styled.div`
  margin-top: -2.7rem;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SquareModalBox = styled.div`
  width: 540px;
  height: 300px;
  background-color: #3f5f76;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  margin-top: 0px;
  margin-bottom: 15px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #555;
  }
`;

interface NoticeItemProps {
  noticetitle: string;
  noticecontent: string;
}

function NoticeItem({ noticetitle, noticecontent }: NoticeItemProps) {
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

  const [isStampModalOpen, setIsStampModalOpen] = useState(false);
  const openStampModalOpen = () => {
    setIsStampModalOpen(true);
  };
  const closeStampModal = () => {
    setIsStampModalOpen(false);
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
        <button
          className='stamp'
          onClick={openStampModalOpen}>
          스탬프
        </button>
        <button className='todo'>세션 할 일</button>
        <button
          className='study'
          onClick={() => navigate('/timer')}>
          공부하기
        </button>
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
          <div>안녕1</div>
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

      {isStampModalOpen && (
        <ModalOverlay onClick={closeStampModal}>
          {/* 박스 클릭 시에는 닫히지 않도록 stopPropagation 설정 */}
          <SquareModalBox onClick={(e) => e.stopPropagation()}>
            <h1
              style={{
                color: 'white',
                fontSize: '25px',
                margin: '20px 0 0 0',
                textAlign: 'left',
                width: '80%',
              }}>
              스터디 진행 현황
            </h1>
            <img
              className='stamp'
              src={stamp}
              alt='stamp'
              style={{ width: '380px', height: '210px' }}
            />

            <CloseButton onClick={closeStampModal}>확인</CloseButton>
          </SquareModalBox>
        </ModalOverlay>
      )}
    </div>
  );
}
