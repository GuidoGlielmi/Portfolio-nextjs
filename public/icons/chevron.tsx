import React from 'react';
import {SvgProps} from './fullScreenIcon';

type Props = {};

const Chevron = ({width = 40, height = 40}: SvgProps) => {
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='40.000000pt'
      height='40.000000pt'
      viewBox='0 0 40.000000 40.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g
        transform='translate(0.000000,40.000000) scale(0.031250,-0.031250)'
        fill='#eee'
        stroke='none'
      >
        <path
          d='M535 1170 c-198 -44 -352 -180 -417 -368 -32 -95 -32 -249 0 -344 77
-225 291 -378 525 -378 146 0 273 55 382 165 173 172 213 403 109 622 -61 129
-174 230 -312 280 -74 27 -217 39 -287 23z m-13 -467 l118 -117 118 117 c66
64 124 117 131 117 21 0 121 -102 121 -123 0 -26 -325 -355 -359 -364 -20 -5
-48 20 -202 173 -98 98 -179 186 -179 195 0 18 102 119 121 119 7 0 65 -53
131 -117z'
        />
      </g>
    </svg>
  );
};

export default Chevron;
