import styled from 'styled-components';

export const ItemContainer = styled.button<{ $done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 23rem;

  padding: 1.5rem 2rem;
  margin: 0.75rem 0;
  border-radius: 40px;
  border: 1px solid #976a50;
  cursor: pointer;

  background-color: ${({ $done }) => ($done ? '#8B5A3C' : 'transparent')};
  transition: 0.2s ease-in-out;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-color: #976a50;
  accent-color: white;
`;

export const Label = styled.p<{ $done: boolean }>`
  flex: 1;
  margin-left: 12px;
  font-size: small;
  color: ${({ $done }) => ($done ? 'white' : '#572908')};
`;

export const RightText = styled.p<{ $done: boolean }>`
  color: ${({ $done }) => ($done ? 'white' : '#976A50')};
  font-size: small;
  margin-left: auto;
`;
