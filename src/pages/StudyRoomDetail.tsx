import { studyroomList, type Studyroom } from '@/api/studyrooms'; // API 변경
import back from '@/assets/back.svg';
import info from '@/assets/info.svg';
import sample1 from '@/assets/sample1.svg';
import sample2 from '@/assets/sample2.svg';
import sample3 from '@/assets/sample3.svg';
import stamp from '@/assets/stamp.svg';
import WaveHeader from '@/components/WaveHeader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './StudyRoomDetail.css';

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
  const { groupId } = useParams<{ groupId: string }>(); // URL에서 groupId 추출

  // 상태 타입을 Studyroom | null 로 변경
  const [room, setRoom] = useState<Studyroom | null>(null);
  const [loading, setLoading] = useState(true);

  // API 호출 및 필터링 로직
  useEffect(() => {
    const fetchAndFindRoom = async () => {
      if (!groupId) return;

      try {
        setLoading(true);
        // 1. 전체 리스트 가져오기
        const allRooms = await studyroomList();

        // 2. 현재 groupId와 일치하는 방 찾기 (타입 변환 주의)
        const targetRoom = allRooms.find((r) => r.groupId === Number(groupId));

        if (targetRoom) {
          setRoom(targetRoom);
        } else {
          alert('해당 스터디룸 정보를 찾을 수 없습니다.');
          navigate('/studyroom');
        }
      } catch (error) {
        console.error('Failed to fetch study room list:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndFindRoom();
  }, [groupId, navigate]);

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

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중...</div>;
  }

  if (!room) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>데이터가 없습니다.</div>;
  }

  return (
    <div>
      <WaveHeader>
        <div>
          <TextContainer>
            {/* 찾은 room 데이터 바인딩 */}
            <p style={{ fontSize: '22px', fontWeight: 'Bold' }}>{room.name}</p>
            {/* startDay를 표시하거나 기존 하드코딩 유지 */}
            <p style={{ marginLeft: '0.35rem' }}>{room.startDay}</p>
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
        <button
          className='todo'
          onClick={() => navigate('/todoSession')}>
          세션 할 일
        </button>
        <button
          className='study'
          onClick={() => navigate('/timer')}>
          공부하기
        </button>
      </div>

      {/* Studyroom 타입에 description이 없으므로 임시 텍스트 처리 */}
      <NoticeItem
        noticetitle='공지사항'
        noticecontent={`현재 ${room.sessionId}회차 진행 중입니다. (목표: 총 ${room.totalSessions}회)`}
      />

      <div className='tablecontainers'>
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
