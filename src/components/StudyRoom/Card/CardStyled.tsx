import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 320px;
  height: 467px;
  margin: 0 10px;
  background-color: #dfbd9a;
  border-radius: 16px;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.4);
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  gap: 25px;
`;

export const Title = styled.div`
  display: inline-block;
  padding: 10px 25px 8px 25px;
  border-bottom: 2px solid #ac7349;
  font-size: 20px;
  font-weight: 600;
`;

export const Button = styled.button`
  display: inline-block;
  padding: 0.7rem 1.5rem;
  background-color: #f0f0f0;
  border-radius: 20px;
  color: #424242;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 35px 0 0 45px;
  gap: 7px;
`;

export const ContentText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #572908;
`;

export const Image = styled.img`
  width: 165px;
  height: 175px;
  margin-top: 3px;
  margin-left: 140px;
`;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

// 흰색 배경 바 (전체 길이)
export const ProgressTrack = styled.div`
  width: 255px;
  height: 11px;
  border-radius: 2px;
  background-color: white;
  overflow: hidden;
`;

// 실제 채워지는 색상 바 (props로 width를 받음)
export const ProgressFill = styled.div<{ $width: number }>`
  width: ${(props) => props.$width}%;
  height: 100%;
  background-color: #ac7349;
  transition: width 0.3s ease-in-out;
`;

export const ProgressText = styled.p`
  font-size: 11px;
  font-weight: 300;
  color: white;
  align-self: flex-start;
  margin-left: 45px;
`;