import styled from 'styled-components';
import CustomButton from '@/components/ui/CustomButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
  gap: 2rem;
  padding: 3rem 1rem;
`;

const TextContainer = styled.div`
  align-self: flex-start;
  margin: 3rem 2rem;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Box = styled.input`
  width: 80%;
  height: 3rem;
  border-bottom: 1px solid #d2c1b7;
  padding-left: 1rem;
  outline: none;
`;

export default function EnterPage() {
  return (
    <Container>
      <TextContainer>
        <p style={{ marginBottom: '0.2rem' }}>
          <span style={{ color: '#A57865' }}>0000스터디룸</span>
          <span style={{ color: 'black' }}>의 입장코드</span>
        </p>

        <p style={{ fontSize: '14px', WebkitTextFillColor: 'gray' }}>
          스터디그룹에 합류하기 위한 입장 코드를 입력해주세요
        </p>
      </TextContainer>
      <Box
        type='text'
        placeholder='abcde'
        style={{ marginBottom: '17rem' }}
      />
      <CustomButton
        label='스터디룸 입장하기'
        size='large'
        color='darkBrown'
      />
    </Container>
  );
}
