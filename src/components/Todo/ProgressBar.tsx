import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBat({ percentage }: ProgressBarProps) {
  return (
    <ProgressBar
      completed={percentage}
      maxCompleted={100}
      width='15rem'
      height='1rem'
      baseBgColor='#8e8c8c8d'
      bgColor='#D9C481'
      borderRadius='2px'
      labelAlignment='outside'
      labelColor='#5E5D5D'
    />
  );
}
