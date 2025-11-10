import styled from 'styled-components';

interface ModalProps {
  $color?: string;
  $textColor?: string;
}

export const PlusButton = styled.img`
  position: absolute;
  top: 7.5%;
  left: 75%;
  z-index: 10;
`;

export const Overlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export const ModalWrapper = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  position: fixed;
  top: 13%;
  left: 63%;
  flex-direction: column;
  gap: 0.9rem;
  z-index: 999;
`;

export const Modal = styled.div<ModalProps>`
  background-color: ${({ $color }) => $color || '#976A50'};
  padding: 0.7rem 1.8rem;
  border-radius: 2.3rem;
  cursor: pointer;

  -webkit-text-fill-color: ${({ $textColor }) => $textColor || 'white'};
  font-size: 16px;
  font-weight: 500;
`;
