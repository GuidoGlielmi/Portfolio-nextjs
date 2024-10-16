import {SvgProps} from './fullScreenIcon';

const PlayIcon = ({width = 40, height = 40}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height || '100%'}
      viewBox='0 0 30 30'
      xmlns='http://www.w3.org/2000/svg'
      stroke='white'
      strokeWidth={2}
      fill='#151515'
      style={{background: 'white', cursor: 'pointer'}}
    >
      <g data-name='Layer 2' id='Layer_2'>
        <g id='Interface-Solid'>
          <g id='interface-solid-multimedia-play-button'>
            <path
              d='M15.6922,11.59473l-1.943-1.3562a1,1,0,0,0-1.57239.82006v7.88282a1,1,0,0,0,1.57239.82006l1.943-1.3562,3.70343-2.58545a.99989.99989,0,0,0,0-1.63989Z'
              fill='none'
            />
            <path d='M15,0A15,15,0,1,0,30,15,15.01672,15.01672,0,0,0,15,0Zm4.39563,15.81982L15.6922,18.40527l-1.943,1.3562a1,1,0,0,1-1.57239-.82006V11.05859a1,1,0,0,1,1.57239-.82006l1.943,1.3562,3.70343,2.5852A.99989.99989,0,0,1,19.39563,15.81982Z' />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default PlayIcon;
