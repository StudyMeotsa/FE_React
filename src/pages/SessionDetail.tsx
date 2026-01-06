import { ArrowLeft, Camera, Check, Image as ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';

// --------------------------------------------------------------------------
// [섹션 1] 데이터 타입 및 초기 데이터
// --------------------------------------------------------------------------
interface Member {
  id: number;
  name: string;
  isMe: boolean;
  submitted: boolean;
  content?: string;
  images?: string[];
}

const INITIAL_MEMBERS: Member[] = [
  { id: 1, name: '나 (User)', isMe: true, submitted: false, images: [] },
  {
    id: 2,
    name: '김멋사',
    isMe: false,
    submitted: true,
    content: '필기 내용 공유합니다.',
    images: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'],
  },
  {
    id: 3,
    name: '이라이언',
    isMe: false,
    submitted: true,
    content: '어려웠지만 정리해봤어요.',
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80'],
  },
  { id: 4, name: '박코드', isMe: false, submitted: false, images: [] },
];

export default function SessionDetail() {
  // --------------------------------------------------------------------------
  // [섹션 2] 상태 관리 및 훅
  // --------------------------------------------------------------------------
  const { id } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);

  // -- 모달 관련 상태 --
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --------------------------------------------------------------------------
  // [섹션 3] 핸들러 함수들
  // --------------------------------------------------------------------------

  // 1) 작성 모달 열기 (초기화 포함)
  const handleOpenWriteModal = () => {
    setInputText('');
    setPreviewImages([]);
    setIsWriteModalOpen(true);
  };

  // 2) 파일 선택 핸들러 (최대 5장 제한)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const totalImages = previewImages.length + files.length;
    if (totalImages > 5) {
      alert('사진은 최대 5장까지만 업로드 가능합니다.');
      return;
    }

    const newImageUrls: string[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newImageUrls.push(url);
    });

    setPreviewImages((prev) => [...prev, ...newImageUrls]);

    // 같은 파일 다시 선택 가능하도록 value 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 3) 최종 제출 핸들러
  const submitAssignment = () => {
    if (inputText.trim() === '' && previewImages.length === 0) {
      alert('내용이나 사진을 입력해주세요.');
      return;
    }

    setMembers((prev) =>
      prev.map((member) => {
        if (member.isMe) {
          return {
            ...member,
            submitted: true,
            content: inputText,
            images: previewImages,
          };
        }
        return member;
      })
    );
    setIsWriteModalOpen(false);
  };

  return (
    <div className='flex min-h-screen flex-col bg-[#F9F9F9]'>
      {/* --------------------------------------------------------------------------
          [섹션 4] 헤더
          -------------------------------------------------------------------------- */}
      <header className='sticky top-0 z-10 bg-[#F9F9F9] px-4 py-4'>
        <div className='relative flex items-center justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='absolute left-0 p-2 text-[#191F28] transition-colors hover:text-gray-600'>
            <ArrowLeft size={24} />
          </button>
          <div className='flex flex-col items-center'>
            <h1 className='text-xl font-bold text-[#191F28]'>세션 할 일</h1>
            <span className='mt-1 text-xs text-gray-500'>8월 19일 ~ 8월 21일</span>
          </div>
        </div>
      </header>

      <main className='flex flex-1 flex-col px-6 pb-24'>
        {/* 과제 설명 */}
        <div className='mt-4 border-b pb-8'>
          <h2 className='text-xl font-bold text-[#191F28]'>3주차 수업 내용 정리하기 (ID: {id})</h2>
          <p className='mt-4 text-sm leading-relaxed text-gray-600'>
            알고리즘 수업의 3주차 내용을 정리한 필기를 올려주세요. 교안 필기, 노트 정리 등 다양한
            방식으로 제출해주세요.
          </p>
        </div>

        {/* --------------------------------------------------------------------------
            [섹션 5] 멤버 리스트 영역
            -------------------------------------------------------------------------- */}
        <div className='mt-8 flex flex-col gap-6'>
          <h3 className='text-sm font-bold text-gray-500'>멤버 제출 현황</h3>

          {members.map((member) => (
            <div
              key={member.id}
              className='flex items-stretch gap-4'>
              {/* 왼쪽: 멤버 프로필 */}
              <div className='flex min-w-[60px] flex-col items-center gap-1'>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white shadow-sm ${
                    member.isMe ? 'bg-[#FFD1C1]' : 'bg-[#EAEAEA]'
                  }`}>
                  <span className='text-lg'>{member.isMe ? '🦁' : '👤'}</span>
                </div>
                <span className='text-xs font-medium text-gray-700'>{member.name}</span>
              </div>

              {/* 오른쪽: 제출 슬롯 */}
              <div className='relative min-h-[128px] flex-1'>
                {member.submitted ? (
                  // A. 제출 완료 상태 (텍스트 + 이미지 썸네일)
                  <div className='relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white p-3 shadow-sm'>
                    {/* 1. 텍스트 내용 */}
                    {member.content && (
                      <p className='mb-2 line-clamp-2 text-xs leading-relaxed text-[#191F28]'>
                        {member.content}
                      </p>
                    )}

                    {/* 2. 이미지 리스트 (가로 스크롤) */}
                    {member.images && member.images.length > 0 && (
                      <div className='scrollbar-hide flex flex-1 items-start gap-2 overflow-x-auto'>
                        {member.images.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className='relative aspect-square h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-100'>
                            <img
                              src={imgUrl}
                              alt={`submission-${idx}`}
                              className='h-full w-full object-cover'
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. 체크 마크 */}
                    <div className='absolute right-2 bottom-2 z-10 flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-[#8B6E5B] text-white shadow-md'>
                      <Check
                        size={14}
                        strokeWidth={3}
                      />
                    </div>

                    {/* 그라데이션 오버레이 */}
                    <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset'></div>
                  </div>
                ) : (
                  // B. 미제출 상태 (이미지 대신 Tailwind Class로 구현)
                  <div
                    onClick={() => member.isMe && handleOpenWriteModal()}
                    className={`flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#F9FAFB] transition-all ${
                      member.isMe
                        ? 'cursor-pointer hover:border-gray-400 hover:bg-gray-100'
                        : 'cursor-default opacity-50'
                    }`}>
                    {member.isMe ? (
                      <div className='flex flex-col items-center gap-2 text-gray-400'>
                        <Camera size={24} />
                        <span className='text-xs'>터치하여 인증하기</span>
                      </div>
                    ) : (
                      <span className='text-xs text-gray-300'>미제출</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --------------------------------------------------------------------------
          [섹션 6] 과제 제출 모달 (Shadcn Dialog)
          -------------------------------------------------------------------------- */}
      <Dialog
        open={isWriteModalOpen}
        onOpenChange={setIsWriteModalOpen}>
        <DialogContent className='rounded-xl sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-[#191F28]'>과제 제출하기</DialogTitle>
            <DialogDescription>과제 내용을 입력하거나 사진을 첨부하세요.</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            {/* 내용 입력 (Shadcn Textarea) */}
            <Textarea
              placeholder='내용을 입력해주세요...'
              className='min-h-[120px] resize-none bg-[#F9F9F9] focus-visible:ring-[#8B6E5B]'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            {/* 이미지 미리보기 */}
            {previewImages.length > 0 && (
              <div className='scrollbar-hide flex gap-2 overflow-x-auto py-1'>
                {previewImages.map((src, idx) => (
                  <div
                    key={idx}
                    className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                    <img
                      src={src}
                      alt='preview'
                      className='h-full w-full object-cover'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className='flex-row justify-between gap-2 sm:justify-between'>
            {/* 사진 추가 버튼 */}
            <div className='flex items-center'>
              <input
                type='file'
                accept='image/*'
                multiple
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileChange}
              />
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => fileInputRef.current?.click()}
                className='text-gray-600'>
                <ImageIcon className='mr-2 h-4 w-4' />
                사진 추가 ({previewImages.length}/5)
              </Button>
            </div>

            {/* 등록 버튼 */}
            <Button
              type='button'
              onClick={submitAssignment}
              className='bg-[#8B6E5B] font-bold text-white hover:bg-[#6F5646]'>
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
