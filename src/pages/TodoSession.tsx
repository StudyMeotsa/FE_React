import SessionItem from '@/components/SessionItem';
import { ArrowLeft, Coffee, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { studyroomList } from '@/api/studyrooms';
import { getSessionChecklists } from '@/api/studyRooomEvent';
import { createSessionChecklist } from '@/api/studyRooomEvent';

// 세션 아이템 타입 정의
interface SessionData {
  id: number;
  text: string;
  subText?: string;
  count: string;
  completed: boolean;
}

export default function TodoSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const idList = location.state;

  // --------------------------------------------------------------------------
  // [상태 관리] 세션 리스트 (기존 더미데이터를 초기값으로 설정)
  // --------------------------------------------------------------------------
  const [sessions, setSessions] = useState<SessionData[]>([
    { id: 1, text: '타이머 채우기', subText: '120 분', count: '10 / 12 명', completed: false },
    { id: 2, text: '3주차 수업 내용 정리하기', count: '10 / 12 명', completed: true },
  ]);

  useEffect(() => {
    if (!idList?.groupId || !idList?.sessionId) {
      console.log('아직 데이터가 준비되지 않았습니다. (Pass)');
      return;
    }

    getSessionChecklists(Number(idList.groupId), Number(idList.sessionId))
      .then((res) => {
        const newList = res.checklists.map((item) => ({
          id: item.checklistId, // 백엔드 ID -> 프론트 ID
          text: item.title, // 제목
          count: `${item.doneMember} / ${item.maxMember} 명`,
          completed: item.mySubmission, // 완료 여부
        }));
        setSessions(newList);
      })
      .catch((err) => {
        console.error('불러오기 실패:', err);
      });
  }, [idList]);

  // 모달 및 입력값 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState(''); // 설명은 상세페이지에서 쓸 수 있지만, 리스트엔 제목만 표시

  // --------------------------------------------------------------------------
  // [핸들러] 할 일 추가
  // --------------------------------------------------------------------------
  const handleAddSession = () => {
    if (!newTitle.trim()) {
      alert('할 일 제목을 입력해주세요!');
      return;
    }

    // 새로운 세션 객체 생성
    const newSession: SessionData = {
      id: Date.now(), // 고유 ID 생성 (간단히 타임스탬프 사용)
      text: newTitle,
      count: '0 / 12 명', // 초기 인원
      completed: false,
      // subText: newDesc, // 필요하다면 설명을 subText로 활용 가능
    };

    // 리스트 상태 업데이트
    setSessions((prev) => [...prev, newSession]);

    // 입력값 초기화 및 모달 닫기
    setNewTitle('');
    setNewDesc('');
    setIsAddModalOpen(false);
  };

  return (
    <div className='flex min-h-screen flex-col bg-[#F9F9F9]'>
      {/* 1) 헤더 영역 */}
      <header className='sticky top-0 z-10 bg-[#F9F9F9] px-4 py-4'>
        <div className='relative flex items-center justify-center'>
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => navigate(-1)}
            className='absolute left-0 p-2 text-[#191F28]'>
            <ArrowLeft size={24} />
          </button>

          {/* 타이틀 및 날짜 */}
          <div className='flex flex-col items-center'>
            <h1 className='text-xl font-bold text-[#191F28]'>세션 할 일</h1>
            <span className='mt-1 text-xs text-gray-500'>8월 19일 ~ 8월 21일</span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='flex flex-1 flex-col items-center px-6 py-10'>
        {/* 커피 아이콘 및 진행바 영역 */}
        <div className='mt-4 mb-8 flex w-full flex-col items-center'>
          <div className='mb-6'>
            <Coffee
              size={80}
              className='text-[#6F4E37]'
            />
          </div>

          <div className='w-full max-w-[280px]'>
            <div className='relative h-3 w-full rounded-full bg-gray-200'>
              <div
                className='absolute top-0 left-0 h-3 rounded-full bg-[#D4C4A6]'
                style={{ width: '80%' }}></div>
            </div>
            <div className='mt-1 flex justify-between text-sm font-medium text-gray-500'>
              <span>0</span>
              <span>80</span>
            </div>
          </div>

          <div className='mt-2 text-lg font-bold text-[#6F4E37]'>☕ 80알</div>
        </div>

        {/* 2) 리스트 영역 (State인 sessions를 렌더링) */}
        <div className='w-full'>
          {sessions.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/session/${item.id}`)}
              className='cursor-pointer transition-transform active:scale-[0.98]'>
              <SessionItem
                text={item.text}
                subText={item.subText}
                count={item.count}
                completed={item.completed}
              />
            </div>
          ))}
        </div>

        {/* 3) 하단 버튼 (추가하기) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#8B6E5B] py-4 text-[#8B6E5B] transition-colors hover:bg-[#8B6E5B]/10'>
          <Plus size={20} />
          <span className='font-bold'>추가하기</span>
        </button>
      </main>

      {/* --------------------------------------------------------------------------
          [모달] 할 일 추가
          -------------------------------------------------------------------------- */}
      <Dialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}>
        <DialogContent className='rounded-2xl sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>할 일 추가하기</DialogTitle>
            <DialogDescription>이번 세션에 진행할 새로운 과제를 등록합니다.</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <label
                htmlFor='task-title'
                className='text-sm font-bold text-[#191F28]'>
                제목
              </label>
              <Input
                id='task-title'
                placeholder='예: 4주차 과제 - BFS 구현'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className='bg-[#F9F9F9]'
              />
            </div>
            <div className='grid gap-2'>
              <label
                htmlFor='task-desc'
                className='text-sm font-bold text-[#191F28]'>
                설명 (선택)
              </label>
              <Textarea
                id='task-desc'
                placeholder='제출 방식, 진행 방법, 권장 사항 등 추가적인 설명을 적어주세요.'
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className='min-h-[100px] resize-none bg-[#F9F9F9]'
              />
            </div>
          </div>

          <DialogFooter className='flex-row gap-2 sm:justify-end'>
            <Button
              type='button'
              variant='secondary'
              className='flex-1 sm:flex-none'
              onClick={() => setIsAddModalOpen(false)}>
              취소
            </Button>
            <Button
              type='button'
              onClick={handleAddSession}
              className='flex-1 bg-[#8B6E5B] hover:bg-[#6F5646] sm:flex-none'>
              등록하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
