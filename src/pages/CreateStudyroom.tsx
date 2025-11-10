import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type CreateStudyroomType = {
  name: string;
  weeklySessions: string;
  totalSessions: string;
  minWeeklyStudyTime: string;
  maxParticipants: string;
  description: string;
};

export default function CreateStudyroom() {
  const [studyInfo, setStudyInfo] = useState<CreateStudyroomType>({
    name: '',
    weeklySessions: '', // 주간 세션횟수
    totalSessions: '', // 총 세션 횟수
    minWeeklyStudyTime: '', // 최소 주간 공부량(분)
    maxParticipants: '', // 최대 인원
    description: '', // 스터디 소개글
  });

  // 제출 핸들러
  const handleSubmit = () => {
    console.log(studyInfo);
  };
  return (
    <div className='flex flex-col'>
      <header className='flex justify-between p-5'>
        <Button
          size='icon'
          variant='ghost'
          className='rounded-full'>
          <ArrowLeft />
        </Button>
        <Label className=''>스터디룸 생성하기</Label>
        <Label></Label>
      </header>
      <main className='flex h-full flex-1 flex-col items-center gap-5 px-10'>
        <div className='grid w-full gap-3'>
          <Label htmlFor='text'>스터디룸 이름</Label>
          <Input
            className='border-amber-700'
            type='text'
            value={studyInfo.name}
            onChange={(e) => setStudyInfo({ ...studyInfo, name: e.target.value })}
          />
        </div>
        <div className='grid w-full gap-3'>
          <Label htmlFor='text'>주간 세션 횟수</Label>
          <Input
            className='border-amber-700'
            type='text'
            value={studyInfo.weeklySessions}
            onChange={(e) => setStudyInfo({ ...studyInfo, weeklySessions: e.target.value })}
          />
        </div>
        <div className='grid w-full gap-3'>
          <Label htmlFor='text'>총 세션 횟수</Label>
          <Input
            className='border-amber-700'
            type='text'
            value={studyInfo.totalSessions}
            onChange={(e) => setStudyInfo({ ...studyInfo, totalSessions: e.target.value })}
          />
        </div>
        <div className='grid w-full gap-3'>
          <Label htmlFor='text'>최소 주간 공부량(분)</Label>
          <Input
            className='border-amber-700'
            type='text'
            value={studyInfo.minWeeklyStudyTime}
            onChange={(e) => setStudyInfo({ ...studyInfo, minWeeklyStudyTime: e.target.value })}
          />
        </div>
        <div className='grid w-full gap-3'>
          <Label htmlFor='text'>최대 인원</Label>
          <Input
            className='border-amber-700'
            type='text'
            value={studyInfo.maxParticipants}
            onChange={(e) => setStudyInfo({ ...studyInfo, maxParticipants: e.target.value })}
          />
        </div>
        <div className='grid w-full gap-3'>
          <Label htmlFor='text'>스터디 소개글</Label>
          <Textarea
            className='max-h-30 border-amber-700' //최대 높이 설정
            value={studyInfo.description}
            onChange={(e) => setStudyInfo({ ...studyInfo, description: e.target.value })}
          />
        </div>

        <Button
          onClick={handleSubmit}
          className='w-full rounded-2xl bg-amber-700 py-7'>
          스터디룸 생성하기
        </Button>
      </main>
    </div>
  );
}
