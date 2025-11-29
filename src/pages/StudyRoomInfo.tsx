import * as S from '../components/StudyRoom/Create/BasicStyled';
import Input from '@/components/StudyRoom/Create/Input';
import CustomButton from '@/components/ui/CustomButton';
import back from '../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import './StudyRoomInfo.css';

export default function StudyRoomCreate() {
  const navigate = useNavigate();
  const backButtonClick = () => {
    navigate('/studyroomdetail');
  };

  return (
    <S.Container>
      <button onClick={backButtonClick}>
        <img
          className='back'
          src={back}
        />
      </button>
      <S.Title>
        <p>스터디룸 정보</p>
      </S.Title>
      <Input
        title='스터디룸 이름'
        placeholder='알고리즘 스터디(최대 10자)'
      />
      <Input
        title='주간 세션 횟수'
        placeholder='2'
        type='number'
      />
      <Input
        title='총 세션 횟수'
        placeholder='10'
        type='number'
      />
      <Input
        title='최소 주간 공부량(분)'
        placeholder='120'
        type='number'
      />
      <Input
        title='최대 인원'
        placeholder='20'
        type='number'
      />
      <CustomButton
        label='스터디룸 나가기'
        size='large'
        color='darkBrown'
        style={{ marginTop: '2rem' }}
      />
    </S.Container>
  );
}
