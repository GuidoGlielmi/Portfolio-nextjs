import React from 'react';

type Props = {
  width: string | number;
  height?: string | number;
};

const FullScreenIcon = ({width, height}: Props) => {
  return (
    <svg
      stroke='#606060'
      height={height || '100%'}
      width={width}
      version='1.1'
      id='Capa_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 384.97 384.97'
      xmlSpace='preserve'
    >
      <g>
        <g id='Fullscreen_1_'>
          <path
            strokeWidth={20}
            d='M372.939,216.545c-6.123,0-12.03,5.269-12.03,12.03v132.333H24.061V24.061h132.333c6.388,0,12.03-5.642,12.03-12.03
			S162.409,0,156.394,0H24.061C10.767,0,0,10.767,0,24.061v336.848c0,13.293,10.767,24.061,24.061,24.061h336.848
			c13.293,0,24.061-10.767,24.061-24.061V228.395C384.97,221.731,380.085,216.545,372.939,216.545z'
          />
          <path
            strokeWidth={20}
            d='M372.939,0H252.636c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h91.382L99.635,268.432
			c-4.668,4.668-4.668,12.235,0,16.903c4.668,4.668,12.235,4.668,16.891,0L360.909,40.951v91.382c0,6.641,5.39,12.03,12.03,12.03
			s12.03-5.39,12.03-12.03V12.03l0,0C384.97,5.558,379.412,0,372.939,0z'
          />
        </g>
      </g>
    </svg>
  );
};

export default FullScreenIcon;
