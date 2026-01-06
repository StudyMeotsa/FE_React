import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignup } from '../api/auth';
import type { RegisterRequest } from '../types/auth.type';

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 초기값 설정
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    sex: 'M', // 기본값
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 유효성 검사
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsLoading(true);
      // 2. API 요청
      await postSignup(formData);

      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      // 에러 메시지는 서버 응답에 따라 다를 수 있음
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900'>회원가입</h2>
          <p className='mt-2 text-sm text-gray-600'>새로운 계정을 생성합니다.</p>
        </div>

        <form
          className='mt-8 space-y-4'
          onSubmit={handleSubmit}>
          {/* 이름 */}
          <div>
            <label className='block text-sm leading-6 font-medium text-gray-900'>이름</label>
            <input
              name='name'
              type='text'
              required
              className='mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className='block text-sm leading-6 font-medium text-gray-900'>이메일</label>
            <input
              name='email'
              type='email'
              required
              className='mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* 성별 */}
          <div>
            <label className='block text-sm leading-6 font-medium text-gray-900'>성별</label>
            <select
              name='sex'
              className='mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              value={formData.sex}
              onChange={handleChange}>
              <option value='M'>남성</option>
              <option value='F'>여성</option>
            </select>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className='block text-sm leading-6 font-medium text-gray-900'>비밀번호</label>
            <input
              name='password'
              type='password'
              required
              className='mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className='block text-sm leading-6 font-medium text-gray-900'>
              비밀번호 확인
            </label>
            <input
              name='passwordConfirm'
              type='password'
              required
              className={`mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                formData.passwordConfirm && formData.password !== formData.passwordConfirm
                  ? 'ring-red-500 focus:ring-red-500' // 불일치 시 빨간 테두리
                  : 'ring-gray-300'
              }`}
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
            {formData.passwordConfirm && formData.password !== formData.passwordConfirm && (
              <p className='mt-1 text-xs text-red-500'>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <div className='pt-4'>
            <button
              type='submit'
              disabled={isLoading}
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300'>
              {isLoading ? '가입 중...' : '회원가입 완료'}
            </button>
          </div>

          <div className='text-center text-sm'>
            <span className='text-gray-500'>이미 계정이 있으신가요? </span>
            <Link
              to='/login'
              className='font-semibold text-indigo-600 hover:text-indigo-500'>
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
