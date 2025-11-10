import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

interface CustomButtonProps {
  label: string;
  size?: 'large' | 'medium' | 'small';
  color?: 'white' | 'brown' | 'darkBrown';
  style?: CSSProperties;
}

const sizes = {
  small: css`
    width: 130px;
    height: 60px;
    border-radius: 30px;
  `,
  medium: css`
    width: 160px;
    height: 60px;
    border-radius: 30px;
  `,
  large: css`
    width: 75%;
    height: 56px;
    border-radius: 16px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  `,
};

const colors = {
  white: css`
    background-color: white;
    border: 2px solid #572908;
    color: #572908;
  `,
  brown: css`
    background-color: #976a50;
    color: white;
    border: none;
  `,
  darkBrown: css`
    background-color: #794e47;
    color: white;
    border: none;
  `,
};

const Button = styled.button<{
  size: 'small' | 'medium' | 'large';
  color: 'white' | 'brown' | 'darkBrown';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.4px;
  line-height: 20px;
  cursor: pointer;
  transition: opacity 0.2s;

  ${({ size }) => sizes[size]}
  ${({ color }) => colors[color]}

  &:active {
    opacity: 0.8;
  }
`;

export default function CustomButton({
  label,
  size = 'small',
  color = 'white',
  style,
}: CustomButtonProps) {
  return (
    <Button
      size={size}
      color={color}
      style={style}>
      {label}
    </Button>
  );
}
