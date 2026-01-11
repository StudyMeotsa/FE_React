import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Coffee,
  Loader2,
  Lock,
  Mail,
  User,
  UserCircle2,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignup } from '../api/auth';
import type { RegisterRequest } from '../types/auth.type';

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    sex: 'M',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsLoading(true);
      await postSignup(formData);
      alert('환영합니다! 회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 일치 여부 확인 (UI용)
  const isPasswordMatch =
    formData.password && formData.passwordConfirm && formData.password === formData.passwordConfirm;
  const isPasswordMismatch =
    formData.passwordConfirm && formData.password !== formData.passwordConfirm;

  return (
    <div className='flex min-h-screen w-full justify-center bg-[#FDFBF7]'>
      {/* 모바일 뷰포트 제한 컨테이너 */}
      <div className='relative flex h-full min-h-screen w-full max-w-md flex-col bg-white shadow-2xl'>
        {/* --- [1. 상단 비주얼 헤더 (높이 25vh로 축소)] --- */}
        <div className='relative h-[25vh] w-full flex-shrink-0 overflow-hidden bg-[#4B3621]'>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />

          <div className='animate-blob absolute -top-10 -right-10 h-64 w-64 rounded-full bg-[#D4A373]/30 blur-3xl filter' />
          <div className='animate-blob animation-delay-2000 absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-[#E8DCC4]/20 blur-3xl filter' />

          <div className='relative z-10 flex h-full flex-col justify-center px-8 pb-8 text-[#EAE0D5]'>
            <div className='mb-3 flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm'>
                <Coffee className='h-4 w-4 text-[#D4A373]' />
              </div>
              <span className='text-xs font-bold tracking-[0.2em] text-[#D4A373]'>MEMBERSHIP</span>
            </div>
            <h2 className='font-serif text-2xl leading-tight font-medium'>
              새로운 시작을
              <br />
              <span className='font-bold text-white'>응원합니다</span>
            </h2>
          </div>
        </div>

        {/* --- [2. 하단 입력 폼 (Bottom Sheet)] --- */}
        <div className='relative z-20 -mt-8 flex flex-1 flex-col rounded-t-[32px] bg-white px-8 pt-8 pb-8'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-1 flex-col gap-5'>
            {/* 이름 입력 */}
            <div className='group relative'>
              <div
                className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'name' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                <User size={20} />
              </div>
              <input
                name='name'
                type='text'
                required
                placeholder='이름 (닉네임)'
                className='w-full rounded-2xl border border-gray-100 bg-[#F9F9F9] px-12 py-4 text-base text-gray-800 transition-all duration-300 outline-none placeholder:text-gray-400 focus:border-[#D4C4A6] focus:bg-white focus:ring-4 focus:ring-[#D4C4A6]/20'
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            {/* 이메일 입력 */}
            <div className='group relative'>
              <div
                className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                <Mail size={20} />
              </div>
              <input
                name='email'
                type='email'
                required
                placeholder='이메일 주소'
                className='w-full rounded-2xl border border-gray-100 bg-[#F9F9F9] px-12 py-4 text-base text-gray-800 transition-all duration-300 outline-none placeholder:text-gray-400 focus:border-[#D4C4A6] focus:bg-white focus:ring-4 focus:ring-[#D4C4A6]/20'
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            {/* 성별 선택 (커스텀 디자인) */}
            <div className='group relative'>
              <div
                className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'sex' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                <UserCircle2 size={20} />
              </div>
              <select
                name='sex'
                className='w-full appearance-none rounded-2xl border border-gray-100 bg-[#F9F9F9] px-12 py-4 text-base text-gray-800 transition-all duration-300 outline-none focus:border-[#D4C4A6] focus:bg-white focus:ring-4 focus:ring-[#D4C4A6]/20'
                value={formData.sex}
                onChange={handleChange}
                onFocus={() => setFocusedInput('sex')}
                onBlur={() => setFocusedInput(null)}>
                <option value='M'>남성</option>
                <option value='F'>여성</option>
              </select>
              {/* 화살표 아이콘 커스텀 */}
              <div className='pointer-events-none absolute top-4 right-4 text-gray-400'>
                <ChevronDown size={20} />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className='group relative'>
              <div
                className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'password' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                <Lock size={20} />
              </div>
              <input
                name='password'
                type='password'
                required
                placeholder='비밀번호'
                className='w-full rounded-2xl border border-gray-100 bg-[#F9F9F9] px-12 py-4 text-base text-gray-800 transition-all duration-300 outline-none placeholder:text-gray-400 focus:border-[#D4C4A6] focus:bg-white focus:ring-4 focus:ring-[#D4C4A6]/20'
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className='group relative'>
              <div
                className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'passwordConfirm' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                <CheckCircle2 size={20} />
              </div>
              <input
                name='passwordConfirm'
                type='password'
                required
                placeholder='비밀번호 확인'
                className={`w-full rounded-2xl border bg-[#F9F9F9] px-12 py-4 text-base text-gray-800 transition-all duration-300 outline-none placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  isPasswordMismatch
                    ? 'border-red-200 focus:border-red-400 focus:ring-red-100'
                    : isPasswordMatch
                      ? 'border-green-200 focus:border-green-400 focus:ring-green-100'
                      : 'border-gray-100 focus:border-[#D4C4A6] focus:ring-[#D4C4A6]/20'
                }`}
                value={formData.passwordConfirm}
                onChange={handleChange}
                onFocus={() => setFocusedInput('passwordConfirm')}
                onBlur={() => setFocusedInput(null)}
              />
              {/* 불일치 메시지 */}
              {isPasswordMismatch && (
                <div className='mt-2 flex animate-pulse items-center gap-1 pl-1 text-xs text-red-500'>
                  <AlertCircle size={12} />
                  <span>비밀번호가 일치하지 않습니다.</span>
                </div>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <button
              type='submit'
              disabled={isLoading}
              className='relative mt-4 w-full overflow-hidden rounded-2xl bg-[#4B3621] py-4 text-base font-bold text-white shadow-[0_10px_20px_-10px_rgba(75,54,33,0.5)] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'>
              <span className='flex items-center justify-center gap-2'>
                {isLoading ? (
                  <>
                    <Loader2
                      className='animate-spin'
                      size={20}
                    />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>회원가입하기</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </span>
            </button>

            {/* 하단 로그인 링크 */}
            <div className='pb-4 text-center text-sm text-gray-500'>
              이미 계정이 있으신가요?{' '}
              <Link
                to='/login'
                className='font-bold text-[#8B6E5B] underline decoration-[#8B6E5B]/30 decoration-2 underline-offset-4 hover:text-[#4B3621]'>
                로그인하러 가기
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* 애니메이션 스타일 정의 */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
