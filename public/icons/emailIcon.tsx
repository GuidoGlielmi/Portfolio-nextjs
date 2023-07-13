import React from 'react';
import {SvgProps} from './fullScreenIcon';

const EmailIcon = ({width = 40, height = 40}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height || '100%'}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 512 512'
      xmlSpace='preserve'
    >
      <circle fill='#386895' cx='256' cy='256' r='256' />
      <path
        fill='#273B7A'
        d='M511.902,249.006l-49.895-49.895l-149.118,28.444L84.471,357.047l154.367,154.367
	C244.512,511.79,250.232,512,256,512c141.384,0,256-114.616,256-256C512,253.661,511.964,251.33,511.902,249.006z'
      />
      <path
        fill='#FFFFFF'
        d='M462.007,199.111l-102.815-89.967c-4.387-3.839-11.89-1.121-11.89,4.31v39.776h-171.48
	c-6.654,0-12.05,4.72-12.05,10.545v70.677c0,5.823,5.396,10.545,12.05,10.545H347.3v39.776c0,5.43,7.502,8.149,11.89,4.31
	L462.007,199.111z'
      />
      <rect x='84.471' y='199.111' fill='#FEE187' width='236.899' height='157.927' />
      <rect x='202.852' y='199.111' fill='#FFC61B' width='118.529' height='157.927' />
      <polygon fill='#E59413' points='321.376,199.111 202.924,278.08 84.471,199.111 ' />
      <polygon
        fill='#D48B07'
        points='321.376,199.111 202.847,199.111 202.847,278.028 202.924,278.08 '
      />
    </svg>
  );
};

export default EmailIcon;
