import * as S from '../components/StudyRoom/Create/BasicStyled';
import Input from '@/components/StudyRoom/Create/Input';
import CustomButton from '@/components/ui/CustomButton';
import { studyroomCreate } from '@/api/studyrooms';

export default function StudyRoomCreate() {
  return (
    <S.Container>
      <S.Title>
        <p>스터디룸 생성하기</p>
      </S.Title>
      <Input
        title='스터디룸 이름'
        placeholder='스터디룸 이름을 입력하세요'
      />
      <Input
        title='스터디 시작 일자'
        type='date'
      />
      <Input
        title='주간 세션 횟수'
        placeholder='주간 세션 횟수를 입력하세요'
        type='number'
      />
      <Input
        title='총 세션 횟수'
        placeholder='총 세션 횟수를 입력하세요'
        type='number'
      />
      <Input
        title='최대 인원'
        placeholder='스터디 최대 인원을 입력하세요'
        type='number'
      />
      <Input
        title='최소 주간 공부량(분)'
        placeholder='최소 주간 공부량(분)을 입력하세요'
        type='number'
      />
      <div className='items-center mt-3'>
        <h2 className='text-start font-bold mb-1 ml-1'>스터디 소개글</h2>
        <textarea className='w-103 border bg-white border-#d2c1b7 rounded-md p-2.5'
          placeholder='생성하는 스터디에 대한 소개글을 작성해주세요!'
          rows={6}></textarea>
      </div>

      <CustomButton
        label='스터디룸 생성하기'
        size='large'
        color='darkBrown'
        style={{ marginTop: '2rem' }}
      />
    </S.Container>
  );
}
