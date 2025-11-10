import { useState } from 'react';
import { Link } from 'react-router';
import * as S from './PlusModalStyled';
import Plus from '@/assets/Plus.png';

export default function PlusModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <S.PlusButton
        src={Plus}
        alt='button'
        onClick={() => setOpen(true)}></S.PlusButton>

      <S.Overlay
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
    </>
  );
}
