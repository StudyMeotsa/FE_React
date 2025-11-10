import { useState } from 'react';
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
        <S.Modal>생성하기</S.Modal>
        <S.Modal
          $color='#DBCEC4'
          $textColor='black'>
          입장하기
        </S.Modal>
      </S.ModalWrapper>
    </>
  );
}
