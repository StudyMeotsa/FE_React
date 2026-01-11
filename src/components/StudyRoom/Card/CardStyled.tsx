import styled from 'styled-components';

// 메인 카드 컨테이너 (갈색 배경)
export const Container = styled.div`
  position: relative; /* 이미지를 겹치기 위해 relative 설정 */
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 480px; /* 높이를 살짝 늘려 비율 맞춤 */
  margin: 0 10px;
  padding: 24px;
  background-color: #dcc4ac; /* 이미지의 부드러운 라떼 색상 */
  border-radius: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden; /* 내부 요소가 둥근 모서리를 넘지 않도록 */
`;

// 상단 헤더 영역
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 4px;
`;

// 타이틀 (밑줄 스타일)
export const Title = styled.h2`
  position: relative;
  font-size: 24px;
  font-weight: 800;
  color: #000;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(166, 124, 82, 0.4); /* 반투명 갈색 밑줄 */
    z-index: -1;
  }
`;

// 주차 배지 (이미지의 둥근 버튼 형태)
export const Badge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background-color: #eee8df;
  border-radius: 20px;
  color: #4a4a4a;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

// 내부 정보 박스 (아이보리색)
export const InnerCard = styled.div`
  background-color: #f3efe9;
  border-radius: 20px;
  padding: 24px 20px;
  padding-bottom: 60px; /* 커피 이미지가 들어갈 공간 확보 */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

// 정보 리스트
export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// 개별 정보 아이템 (아이콘 + 텍스트)
export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b3621; /* 진한 커피색 텍스트 */

  svg {
    color: #6f4e37; /* 아이콘 색상 */
    min-width: 16px;
  }

  span {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
`;

// 커피 이미지 래퍼 (절대 위치로 배치)
export const ImageWrapper = styled.div`
  position: absolute;
  bottom: 80px; /* 프로그레스 바 위쪽 */
  right: 10px;
  width: 150px;
  height: 150px;
  z-index: 2; /* InnerCard보다 위에 오도록 */

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.1));
  }
`;

// 하단 프로그레스 영역
export const ProgressContainer = styled.div`
  margin-top: auto;
  padding-top: 10px;
  position: relative;
  z-index: 3;
`;

// Progress 텍스트와 퍼센트가 있는 줄
export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 6px;
  color: #fff;
  padding: 0 4px;

  .label {
    font-size: 12px;
    font-weight: 400;
    opacity: 0.9;
  }
  .value {
    font-size: 14px;
    font-weight: 600;
  }
`;

// 프로그레스 바 트랙 (흰색)
export const ProgressTrack = styled.div`
  width: 100%;
  height: 12px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
`;

// 프로그레스 채워지는 부분 (다크 그레이)
export const ProgressFill = styled.div<{ $width: number }>`
  width: ${(props) => props.$width}%;
  height: 100%;
  background-color: #2c2c2c; /* 이미지의 짙은 회색/검정색 */
  border-radius: 6px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
