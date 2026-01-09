import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 0.3rem;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Back = styled.button`
  position: absolute;
  left: 2rem;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 19.5rem;
  overflow-y: scroll;

  /* Chrome, Safari, Edge */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Internet Explorer 및 Edge (구버전) */
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;
`;
