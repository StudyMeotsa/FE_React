import { postLogin } from '@/api/auth';
import type { LoginRequest } from '@/types/auth.type';
import { Coffee, KeyRound, Loader2, Mail, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const tokens = await postLogin(formData);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다. 정보를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen w-full justify-center bg-[#FDFBF7]'>
      {/* 모바일 뷰포트 제한 (데스크탑에서도 앱처럼 보이게) */}
      <div className='relative flex h-full min-h-screen w-full max-w-md flex-col bg-white shadow-2xl'>
        {/* --- [1. 상단 비주얼 헤더] --- */}
        <div className='relative h-[35vh] w-full overflow-hidden bg-[#4B3621]'>
          {/* 배경 이미지 & 오버레이 */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />

          {/* 장식용 블러 효과 */}
          <div className='animate-blob absolute -top-10 -right-10 h-64 w-64 rounded-full bg-[#D4A373]/30 blur-3xl filter' />
          <div className='animate-blob animation-delay-2000 absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-[#E8DCC4]/20 blur-3xl filter' />

          {/* 타이틀 및 로고 */}
          <div className='relative z-10 flex h-full flex-col justify-center px-8 pb-10 text-[#EAE0D5]'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm'>
                <Coffee className='h-5 w-5 text-[#D4A373]' />
              </div>
              <span className='text-sm font-bold tracking-[0.2em] text-[#D4A373]'>STUDY CAFE</span>
            </div>
            <h2 className='font-serif text-3xl leading-tight font-medium'>
              몰입을 위한
              <br />
              <span className='font-bold text-white'>가장 완벽한 공간</span>
            </h2>
          </div>
        </div>

        {/* --- [2. 하단 입력 폼 (Bottom Sheet 스타일)] --- */}
        <div className='relative z-20 -mt-10 flex flex-1 flex-col rounded-t-[32px] bg-white px-8 pt-10 pb-8'>
          <div className='mb-8'>
            <h3 className='text-xl font-bold text-[#4B3621]'>Welcome Back!</h3>
            <p className='mt-1 text-sm text-gray-500'>오늘도 힘내서 공부 시작해볼까요?</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='flex flex-1 flex-col justify-between'>
            <div className='space-y-5'>
              {/* 이메일 입력 */}
              <div className='group relative'>
                <div
                  className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                  <Mail size={20} />
                </div>
                <input
                  name='email'
                  type='text'
                  required
                  placeholder='이메일 주소'
                  className='w-full rounded-2xl border border-gray-100 bg-[#F9F9F9] px-12 py-4 text-base text-gray-800 transition-all duration-300 outline-none placeholder:text-gray-400 focus:border-[#D4C4A6] focus:bg-white focus:ring-4 focus:ring-[#D4C4A6]/20'
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className='group relative'>
                <div
                  className={`absolute top-4 left-4 transition-colors duration-300 ${focusedInput === 'password' ? 'text-[#8B6E5B]' : 'text-gray-400'}`}>
                  <KeyRound size={20} />
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

              <div className='flex justify-end'>
                <Link
                  to='/forgot-password'
                  className='text-xs font-medium text-gray-400 hover:text-[#4B3621]'>
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className='mt-8 space-y-4'>
              <button
                type='submit'
                disabled={isLoading}
                className='relative w-full overflow-hidden rounded-2xl bg-[#4B3621] py-4 text-base font-bold text-white shadow-[0_10px_20px_-10px_rgba(75,54,33,0.5)] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'>
                <span className='flex items-center justify-center gap-2'>
                  {isLoading ? (
                    <>
                      <Loader2
                        className='animate-spin'
                        size={20}
                      />
                      <span>Brewing...</span>
                    </>
                  ) : (
                    <>
                      <span>입장하기</span>
                      <Sparkles
                        size={18}
                        className='text-[#D4A373]'
                      />
                    </>
                  )}
                </span>
              </button>

              <div className='flex items-center justify-center gap-2 py-2 text-sm text-gray-500'>
                <span>처음 오셨나요?</span>
                <Link
                  to='/signup'
                  className='font-bold text-[#8B6E5B] underline decoration-[#8B6E5B]/30 decoration-2 underline-offset-4 hover:text-[#4B3621]'>
                  회원가입
                </Link>
              </div>
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
