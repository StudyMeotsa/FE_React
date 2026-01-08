import * as S from '../components/StudyRoom/Create/BasicStyled';
import Input from '@/components/StudyRoom/Create/Input';
import CustomButton from '@/components/ui/CustomButton';
import { studyroomCreate } from '@/api/studyrooms';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function StudyRoomCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [startDay, setStartDay] = useState('');
  const [weekSession, setWeekSession] = useState('');
  const [totalWeek, setTotalWeek] = useState('');
  const [maxMember, setMaxMember] = useState('');
  const [studyTimeAim, setStudyTimeAim] = useState('');
  const [description, setDiscription] = useState('');

  const create = async() => {
    try{
      await studyroomCreate(
        name,
        startDay,
        Number(weekSession),
        Number(totalWeek),
        Number(maxMember),
        Number(studyTimeAim),
        description
      );

      alert('스터디룸이 생성되었습니다.');
      navigate('/StudyRoomDetail');
    } catch (e: any){
       if (e.status === 409){
        alert('이미 존재하는 스터디룸명입니다.');
        return;
       }
      alert('스터디룸 생성 실패');
      console.error(e);
    }
  };

  return (
    <S.Container>
      <S.Title>
        <p>스터디룸 생성하기</p>
      </S.Title>
      <Input
        title='스터디룸 이름'
        placeholder='스터디룸 이름을 입력하세요'
        value={name}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Input
        title='스터디 시작 일자'
        type='datetime-local'
        value = {startDay}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setStartDay(e.target.value)}
      />
      <Input
        title='주간 세션 횟수'
        placeholder='주간 세션 횟수를 입력하세요'
        type='number'
        value = {weekSession}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setWeekSession(e.target.value)}
      />
      <Input
        title='총 세션 횟수'
        placeholder='총 세션 횟수를 입력하세요'
        type='number'
        value = {totalWeek}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setTotalWeek(e.target.value)}
      />
      <Input
        title='최대 인원'
        placeholder='스터디 최대 인원을 입력하세요'
        type='number'
        value = {maxMember}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setMaxMember(e.target.value)}
      />
      <Input
        title='최소 주간 공부량(분)'
        placeholder='최소 주간 공부량(분)을 입력하세요'
        type='number'
        value = {studyTimeAim}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setStudyTimeAim(e.target.value)}
      />
      <div className='items-center mt-3'>
        <h2 className='text-start font-bold mb-1 ml-1'>스터디 소개글</h2>
        <textarea className='w-103 border bg-white border-#d2c1b7 rounded-md p-2.5'
          placeholder='생성하는 스터디에 대한 소개글을 작성해주세요!'
          value = {description}
          onChange = {(e) => setDiscription(e.target.value)}
          rows={6}></textarea>
      </div>

      <CustomButton
        label='스터디룸 생성하기'
        size='large'
        color='darkBrown'
        style={{ marginTop: '2rem' }}
        onClick = {create}
      />
    </S.Container>
  );
}
