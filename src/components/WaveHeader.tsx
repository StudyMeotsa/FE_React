import styled from 'styled-components';
import React from 'react';

const WaveContainer = styled.div`
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;
  z-index: 0;
`;
const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1; /* SVG보다 위에 표시 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

type WaveHeaderProps = {
  children?: React.ReactNode;
};

export default function WaveHeader({ children }: WaveHeaderProps) {
  return (
    <WaveContainer>
      <Svg
        width='100%'
        height='100%'
        viewBox='0 0 375 100'
        preserveAspectRatio='none'>
        <path
          fill='#573029'
          fillOpacity='0.2'
          d='M0,65 C100,100 157.5,50 280,70 T375,76 L375,0 L0,0 Z'
        />
        <path
          fill='#A57865'
          fillOpacity='0.28'
          d='M0,80 C60,100 120,45 200,70 Q250,90 300,75 Q350.5,60 375,60 L375,0 L0,0 Z'
        />
      </Svg>

      <Content>{children}</Content>
    </WaveContainer>
  );
}
