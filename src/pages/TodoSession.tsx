import SessionItem from '@/components/SessionItem';
import { ArrowLeft, Coffee, Plus } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
interface CoffeeStatus {
  level: number;
  requiredPerLevel: number;
  current: number;
}

export default function TodoSession() {
  const navigate = useNavigate();

  const { groupId, sessionId } = useParams<{
    groupId: string;
    sessionId: string;
  }>();

  // --------------------------------------------------------------------------
  // [상태 관리] 세션 리스트 (기존 더미데이터를 초기값으로 설정)
  // --------------------------------------------------------------------------
  const [sessions, setSessions] = useState<SessionData[]>([
    { id: 1, text: '타이머 채우기', subText: '120 분', count: '10 / 12 명', completed: false },
    { id: 2, text: '3주차 수업 내용 정리하기', count: '10 / 12 명', completed: true },
  ]);

  // const [coffee, setCoffee] = useState<CoffeeStatus>({
  //   level: 0,
  //   requiredPerLevel: 0,
  //   current: 0,
  // });

  useEffect(() => {
    if (!groupId || !sessionId) return;
    getSessionChecklists(Number(groupId), Number(sessionId))
      .then((res) => {
        console.log('API 응답 데이터:', res.checklists);
        const newList = res.checklists.map((item: any) => ({
          id: item.checklistId,
          text: item.title, // 제목
          subText: item.description,
          count: `${item.doneMember} / ${item.maxMember} 명`,
          completed: item.mySubmission, // 완료 여부
        }));
        setSessions(newList);

        // if (res.coffee) {
        //   setCoffee(res.coffee);
        // }
      })
      .catch((err) => {
        console.error('불러오기 실패:', err);
      });
  }, [groupId, sessionId]);

  // 모달 및 입력값 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState(''); // 설명은 상세페이지에서 쓸 수 있지만, 리스트엔 제목만 표시
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------------------------------------------------------
  // [계산] 진행률 및 커피 계산
  // --------------------------------------------------------------------------
  // const coffeePercentage = useMemo(() => {
  //   if (coffee.requiredPerLevel === 0) return 0;
  //   return Math.min(100, Math.round((coffee.current / coffee.requiredPerLevel) * 100));
  // }, [coffee]);

  // --------------------------------------------------------------------------
  // [핸들러] 할 일 추가
  // --------------------------------------------------------------------------
  const handleAddSession = async () => {
    if (!newTitle.trim()) {
      alert('할 일 제목을 입력해주세요!');
      return;
    }

    // params 유효성 체크 (숫자 변환)
    const gid = Number(groupId);
    const sid = Number(sessionId);

    if (!Number.isFinite(gid) || !Number.isFinite(sid)) {
      alert('groupId/sessionId가 올바르지 않습니다. 라우트 파라미터를 확인해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ request body: { title, description }
      const res = await createSessionChecklist(gid, sid, {
        title: newTitle,
        description: newDesc.trim() || '상세 설명이 없습니다.', // 빈 값일 때 기본 문구 삽입 테스트
      });

      if (res.success) {
        // ✅ 성공하면 리스트에 추가 (백엔드가 checklistId를 안 주니까 일단 임시 id로)
        const newSession: SessionData = {
          id: Date.now(),
          text: newTitle,
          subText: newDesc ? newDesc : undefined,
          count: '0 / 12 명',
          completed: false,
        };

        setSessions((prev) => [...prev, newSession]);

        // 초기화 + 닫기
        setNewTitle('');
        setNewDesc('');
        setIsAddModalOpen(false);
      } else {
        alert('생성에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('세션 할 일 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
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
                // style={{ width: `${coffeePercentage}%` }}></div>
                style={{ width: `80%` }}></div>
            </div>
            <div className='mt-1 flex justify-between text-sm font-medium text-gray-500'>
              <span>0</span>
              {/* <span>{coffee.requiredPerLevel}</span> */}
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
