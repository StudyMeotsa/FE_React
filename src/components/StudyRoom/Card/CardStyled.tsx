import styled from 'styled-components';

// 카드 전체 컨테이너
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

// 카드 Top(스터디 과목 + 플랜)
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
  border-bottom: 1px solid #ac7349;
  font-size: 20px;
  font-weight: 600;
`;

export const Button = styled.button`
  width: 90px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 16px;
  -webkit-text-fill-color: #424242;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

// 카드의 세부 정보
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 35px 0 0 50px;
  gap: 7px;
`;

export const ContentText = styled.p`
  font-size: 16px;
  font-weight: 500;
  -webkit-text-fill-color: #572908;
`;

// 카드 이미지
export const Image = styled.img`
  width: 165px;
  height: 175px;
  margin-top: 3px;
  margin-left: 140px;
`;

// 카드 진도율
export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const Progress = styled.span`
  width: 255px;
  height: 11px;
  border-radius: 2px;
  background-color: white;
`;

export const ProgressText = styled.p`
  font-size: 11px;
  font-weight: 300;
  -webkit-text-fill-color: white;
  align-self: flex-start;
  margin-left: 45px;
`;
