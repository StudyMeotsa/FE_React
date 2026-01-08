import { useNavigate } from 'react-router';
import back from '../assets/back.svg';
import * as S from '@/components/Todo/TodoStyle';
import Latte from '@/assets/Latte.png';
import ProgressBar from '@/components/Todo/ProgressBar';
import ToDoItem from '@/components/Todo/TodoItem';
import { useState } from 'react';

export default function TodoPage() {
  const navigate = useNavigate();
  const backButtonClick = () => {
    navigate('/studyroom');
  };

  const [items, setItems] = useState([
    { label: '3주차 수업 내용 정리하기', done: true },
    { label: '강의 하나 듣기', done: true },
    { label: '타이머 채우기 120', done: false },
    { label: '4페이지 이상 문제 풀기', done: false },
    { label: '4페이지 이상 문제 풀기', done: false },
    { label: '4페이지 이상 문제 풀기', done: false },
    { label: '4페이지 이상 문제 풀기', done: false },
    { label: '4페이지 이상 문제 풀기', done: false },
  ]);

  return (
    <>
      <S.Header>
        <S.Container>
          <S.Back onClick={backButtonClick}>
            <img src={back} />
          </S.Back>
          <p style={{ fontSize: '22px', fontWeight: 'Bold' }}>세션 할 일</p>
        </S.Container>
        <p style={{ WebkitTextFillColor: '#5E5D5D' }}>8월 19일 ~ 8월 21일</p>
      </S.Header>

      <S.ImgContainer>
        <img
          src={Latte}
          alt='Latte Img'
          style={{ marginBottom: '1rem' }}
        />
        <ProgressBar percentage={80} />
      </S.ImgContainer>

      <S.ButtonContainer>
        <div style={{ marginTop: '2rem' }}>
          {items.map((item, i) => (
            <ToDoItem
              key={i}
              label={item.label}
              done={item.done}
            />
          ))}
        </div>
      </S.ButtonContainer>
    </>
  );
}
