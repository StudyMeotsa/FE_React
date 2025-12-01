import * as S from '@/components/Todo/TodoItemStyle';

interface TodoItemProps {
  label: string;
  done: boolean;
}

export default function ToDoItem({ label, done }: TodoItemProps) {
  return (
    <S.ItemContainer $done={done}>
      <S.LeftSection>
        <S.CheckBoxWrapper>
          <S.CheckBox
            type='checkbox'
            checked={done}
            readOnly
          />
        </S.CheckBoxWrapper>

        <S.Label $done={done}>{label}</S.Label>
      </S.LeftSection>

      <S.RightText $done={done}>10 / 12명</S.RightText>
    </S.ItemContainer>
  );
}
