import * as S from '../components/StudyRoom/Create/BasicStyled';
import CustomButton from '@/components/ui/CustomButton';
import back from '../assets/back.svg';
import './StudyRoomInfo.css';
import { studyroomInfo } from '@/api/studyrooms';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { StudyroomInfoType } from '@/api/studyrooms';
import { leaveStudyroom } from '@/api/studyrooms';

export default function StudyRoomCreate() {
  // [핸들러] 스터디룸 나가기
  const handleLeaveRoom = async () => {
    if (!window.confirm("정말로 이 스터디룸을 나가시겠습니까?")) return;
    
    try {
      const id = Number(groupId);
      const res = await leaveStudyroom(id);
      if (res.success) {
        alert("스터디룸에서 퇴장하였습니다.");
        navigate('/studyroom'); // 목록 페이지로 이동
      }
    } catch (err) {
      alert("나가기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const navigate = useNavigate();
  const { groupId } = useParams();

  const [info, setInfo] = useState<StudyroomInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const backButtonClick = () => {navigate('/studyroom');};


  useEffect(() => {
    const fetchInfo = async() => {
      try{
        setLoading(true);
        setErrorMsg(null);

        const id = Number(groupId);
        if (!groupId || Number.isNaN(id)) {
          setErrorMsg("잘못된 그룹 ID 입니다.");
          return;
        }

        const data = await studyroomInfo(id);
        setInfo(data);
      } catch (err){
        if (axios.isAxiosError(err)){
          setErrorMsg(
            (err.response?.data as any)?.message ??
            "스터디룸 정보를 불러오지 못했습니다."
          );
        } else {
          setErrorMsg('알 수 없는 오류가 발생했습니다.');
        }
      } finally{
        setLoading(false);
      }
    };

    fetchInfo();
  }, [groupId]);

    if (loading) {
    return (
      <S.Container>
        <div className="w-sm flex items-center justify-center relative py-4 border-b border-yellow-950">
          <button
            className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
            onClick={backButtonClick}
          >
            <img className="back" src={back} alt="뒤로가기" />
          </button>
          <S.Title>스터디룸 정보</S.Title>
        </div>
        <div className="my-6">로딩 중...</div>
      </S.Container>
    );
  }

  if (errorMsg || !info) {
    return (
      <S.Container>
        <div className="w-sm flex items-center justify-center relative py-4 border-b border-yellow-950">
          <button
            className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
            onClick={backButtonClick}
          >
            <img className="back" src={back} alt="뒤로가기" />
          </button>
          <S.Title>스터디룸 정보</S.Title>
        </div>
        <div className="my-6 mx-4">{errorMsg ?? "데이터가 없습니다."}</div>
      </S.Container>
    );
  }

  

  return (
    <S.Container>
      <div className='w-sm flex items-center justify-center relative py-4 border-b border-yellow-950'>
        <button className='cursor-pointer flex items-center justify-center' onClick={backButtonClick}>
        <img
          className='back'
          src={back}
        />
      </button>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <S.Title>
        <p style={{ margin: 0 }}>스터디룸 정보</p>
      </S.Title>
      </div>
      </div>
     <div className='my-3 mx-3 pt-3'>
        <h2 className='font-bold ml-3.5 mb-2'>그룹 아이디</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>스터디룸 이름</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>주간 세션</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>총 세션 횟수</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>목표 시간</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>최대 인원</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>스터디룸 소개</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        <h2 className='font-bold ml-3.5 mb-2'>스터디룸 코드</h2>
        <div className='mx-3 mb-4 py-2 px-5 min-w-sm bg-white border-2 border-D2C1B7 rounded-md'>블라블라블라</div>
        
      </div>
      <CustomButton
        label='스터디룸 나가기'
        size='large'
        color='darkBrown'
        style={{ marginTop: '2rem' }}
        onClick={handleLeaveRoom}
      />
    </S.Container>
  );
}
