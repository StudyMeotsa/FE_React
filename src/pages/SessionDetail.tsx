import { getMyInfo } from '@/api/auth';
import { getSubmissionStatus, submitChecklist, type SubmissionItem } from '@/api/studyRooomEvent';
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
import { ArrowLeft, Camera, Check, Image as ImageIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// UI 표시용 멤버 타입
interface Member {
  id: number;
  name: string;
  isMe: boolean;
  submitted: boolean;
  content?: string;
  images?: string[];
}

export default function SessionDetail() {
  const { groupId, sessionId, checklistId } = useParams<{
    groupId: string;
    sessionId: string;
    checklistId: string;
  }>();

  const navigate = useNavigate();

  // 상태 관리
  const [members, setMembers] = useState<Member[]>([]);
  const [checklistInfo, setChecklistInfo] = useState({ title: '', description: '' });
  const [myInternalName, setMyInternalName] = useState<string>(''); // 내 이름을 저장해둘 State

  // 모달 관련 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --------------------------------------------------------------------------
  // [핵심 1] 데이터 불러오기 및 병합 로직
  // --------------------------------------------------------------------------
  const fetchAllData = async () => {
    if (!groupId || !sessionId || !checklistId) return;

    try {
      // 1. 내 정보 가져오기 (이미 가져왔다면 state 사용, 아니면 API 호출)
      let currentUserName = myInternalName;

      if (!currentUserName) {
        const userInfo = await getMyInfo();
        currentUserName = userInfo.name; // API 응답의 name 필드 사용
        setMyInternalName(currentUserName); // 다음에 쓸 수 있게 저장
        console.log('내 이름 확인:', currentUserName);
      }

      // 2. 제출 현황 가져오기
      const subData = await getSubmissionStatus(
        Number(groupId),
        Number(sessionId),
        Number(checklistId)
      );

      // 제목/설명 업데이트
      setChecklistInfo({
        title: subData.checklist.title,
        description: subData.checklist.description,
      });

      // 3. "나" 판별 및 리스트 변환
      const mappedMembers: Member[] = subData.submissions.map((sub: SubmissionItem) => ({
        id: sub.id,
        name: sub.username,
        // [중요] 내 이름과 제출자 이름이 같은지 비교
        isMe: sub.username === currentUserName,
        submitted: true,
        content: sub.content || undefined,
        images: sub.imagePath ? [sub.imagePath] : [],
      }));

      // 4. 내가 제출 안 했으면 상단에 '나(미제출)' 카드 추가
      const isISubmitted = mappedMembers.some((m) => m.isMe);

      if (!isISubmitted) {
        mappedMembers.unshift({
          id: 0, // 임시 ID
          name: `${currentUserName} (나)`,
          isMe: true,
          submitted: false,
          images: [],
        });
      }

      setMembers(mappedMembers);
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    }
  };

  // 초기 진입 시 실행
  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, sessionId, checklistId]);

  // --------------------------------------------------------------------------
  // 핸들러 함수들
  // --------------------------------------------------------------------------

  const handleOpenWriteModal = () => {
    setInputText('');
    setPreviewImages([]);
    setSelectedFiles([]);
    setIsWriteModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const totalImages = previewImages.length + files.length;
    if (totalImages > 5) {
      alert('사진은 최대 5장까지만 업로드 가능합니다.');
      return;
    }

    const newImageUrls: string[] = [];
    const newFiles: File[] = [];

    Array.from(files).forEach((file) => {
      newImageUrls.push(URL.createObjectURL(file));
      newFiles.push(file);
    });

    setPreviewImages((prev) => [...prev, ...newImageUrls]);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 제출 로직
  const submitAssignment = async () => {
    if (!groupId || !sessionId || !checklistId) return;

    if (inputText.trim() === '' && selectedFiles.length === 0) {
      alert('내용이나 사진을 입력해주세요.');
      return;
    }

    try {
      // 1. 임시로 내 ID를 넣거나, 백엔드가 토큰에서 알아서 처리한다면 0 또는 무시
      // 여기서는 요청 명세에 맞춰 1로 넣거나, getMyInfo에서 얻은 id가 있다면 그걸 써야 함.
      // 일단 기존대로 진행
      const fileToSend = selectedFiles.length > 0 ? selectedFiles[0] : undefined;

      await submitChecklist(Number(groupId), Number(sessionId), Number(checklistId), {
        memberId: 0, // 토큰 기반이면 백엔드가 무시할 수도 있음
        content: inputText,
        file: fileToSend,
      });

      alert('제출이 완료되었습니다!');
      setIsWriteModalOpen(false);

      // [중요] 제출 후 리스트 최신화 (이때는 이미 myInternalName이 있으므로 빠름)
      await fetchAllData();
    } catch (error) {
      console.error(error);
      alert('제출 중 오류가 발생했습니다.');
    }
  };

  // --------------------------------------------------------------------------
  // 렌더링
  // --------------------------------------------------------------------------
  return (
    <div className='flex min-h-screen flex-col bg-[#F9F9F9]'>
      <header className='sticky top-0 z-10 bg-[#F9F9F9] px-4 py-4'>
        <div className='relative flex items-center justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='absolute left-0 p-2 text-[#191F28] transition-colors hover:text-gray-600'>
            <ArrowLeft size={24} />
          </button>
          <div className='flex flex-col items-center'>
            <h1 className='text-xl font-bold text-[#191F28]'>세션 할 일</h1>
          </div>
        </div>
      </header>

      <main className='flex flex-1 flex-col px-6 pb-24'>
        <div className='mt-4 border-b pb-8'>
          <h2 className='text-xl font-bold text-[#191F28]'>
            {checklistInfo.title || '로딩 중...'}
          </h2>
          <p className='mt-4 text-sm leading-relaxed text-gray-600'>{checklistInfo.description}</p>
        </div>

        <div className='mt-8 flex flex-col gap-6'>
          <h3 className='text-sm font-bold text-gray-500'>멤버 제출 현황</h3>

          {members.length === 0 ? (
            <div className='py-10 text-center text-gray-400'>로딩 중이거나 멤버가 없습니다.</div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className='flex items-stretch gap-4'>
                {/* 프로필 이미지 영역 */}
                <div className='flex min-w-[60px] flex-col items-center gap-1'>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white shadow-sm ${
                      member.isMe ? 'bg-[#FFD1C1]' : 'bg-[#EAEAEA]'
                    }`}>
                    <span className='text-lg'>{member.isMe ? '🦁' : '👤'}</span>
                  </div>
                  <span className='text-xs font-medium text-gray-700'>{member.name}</span>
                </div>

                {/* 컨텐츠 영역 */}
                <div className='relative min-h-[128px] flex-1'>
                  {member.submitted ? (
                    // [A] 제출 완료 상태
                    <div className='relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white p-3 shadow-sm'>
                      {member.content && (
                        <p className='mb-2 line-clamp-2 text-xs leading-relaxed text-[#191F28]'>
                          {member.content}
                        </p>
                      )}

                      {/* 이미지 리스트 (S3 권한 해결 시 보임) */}
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
                                // 혹시 모를 로컬호스트 차단 방지용
                                referrerPolicy='no-referrer'
                                onError={(e) => {
                                  // 이미지 에러 시 회색 박스 처리
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className='absolute right-2 bottom-2 z-10 flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-[#8B6E5B] text-white shadow-md'>
                        <Check
                          size={14}
                          strokeWidth={3}
                        />
                      </div>
                    </div>
                  ) : (
                    // [B] 미제출 상태 (내 카드만 클릭 가능)
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
            ))
          )}
        </div>
      </main>

      {/* 모달 (기존 코드 유지) */}
      <Dialog
        open={isWriteModalOpen}
        onOpenChange={setIsWriteModalOpen}>
        <DialogContent className='rounded-xl sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-[#191F28]'>인증하기</DialogTitle>
            <DialogDescription>내용을 입력하거나 사진을 첨부하세요.</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <Textarea
              placeholder='내용을 입력해주세요...'
              className='min-h-[120px] resize-none bg-[#F9F9F9] focus-visible:ring-[#8B6E5B]'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

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
                사진 ({previewImages.length}/5)
              </Button>
            </div>
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
