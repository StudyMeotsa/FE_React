// PlusModal.jsx
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import * as S from './PlusModalStyled';
import Plus from '@/assets/Plus.png';

export default function PlusModal() {
  const [open, setOpen] = useState(false);

  const modal = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <S.Overlay
        className='m-auto w-full max-w-lg'
        $open={open}
        onClick={() => setOpen(false)}
      />
      <S.ModalWrapper $open={open}>
        <Link to='/studyroomCreate'>
          <S.Modal>생성하기</S.Modal>
        </Link>
        <Link to='/enter'>
          <S.Modal
            $color='#DBCEC4'
            $textColor='black'>
            입장하기
          </S.Modal>
        </Link>
      </S.ModalWrapper>
    </div>
  );

  return (
    <>
      <S.PlusButton
        src={Plus}
        alt='button'
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {open && ReactDOM.createPortal(modal, document.body)}
    </>
  );
}
