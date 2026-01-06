import { Check } from 'lucide-react';

interface SessionItemProps {
  text: string;
  subText?: string; // "120 분" 같은 부가 텍스트
  count: string; // "10 / 12 명"
  completed: boolean;
}

export default function SessionItem({ text, subText, count, completed }: SessionItemProps) {
  return (
    <div
      className={`mb-4 flex w-full items-center justify-between rounded-full border px-6 py-5 shadow-sm transition-all ${
        completed
          ? 'border-[#8B6E5B] bg-[#8B6E5B] text-white'
          : 'border-[#8B6E5B] bg-[#FDFBF9] text-[#191F28]'
      }`}>
      <div className='flex items-center gap-3'>
        {/* 체크박스 아이콘 영역 */}
        <div
          className={`flex h-6 w-6 items-center justify-center rounded border ${
            completed ? 'border-white bg-white' : 'border-[#8B6E5B] bg-white'
          }`}>
          {completed && (
            <Check
              size={16}
              className='text-[#8B6E5B]'
              strokeWidth={4}
            />
          )}
        </div>

        {/* 텍스트 영역 */}
        <span className='text-base font-medium'>
          {text} {subText && <span className='ml-1 text-sm opacity-90'>{subText}</span>}
        </span>
      </div>

      {/* 인원수 영역 */}
      <span className={`text-sm ${completed ? 'text-white/90' : 'text-gray-500'}`}>{count}</span>
    </div>
  );
}
