import styled from 'styled-components';

const Title = styled.p`
  align-self: flex-start;
  margin: 1rem 0 0.3rem 3.5rem;
  font-weight: bold;
`;

const Box = styled.input`
  width: 80%;
  height: 3rem;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #d2c1b7;
  padding-left: 1rem;

  /* Chrome, Safari, Edge */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface InputProps {
  title: string;
  placeholder?: string;
  type?: string;
}

export default function Input({ title, placeholder, type = 'text' }: InputProps) {
  return (
    <>
      <Title>{title}</Title>
      <Box
        type={type}
        placeholder={placeholder || title}
      />
    </>
  );
}
