import './SeriesSearchBar.scss'

export default function SeriesSearchBar({ value, onChange }) {
  return (
    <div id='poda'>
      <div className='glow'></div>
      <div className='darkBorderBg'></div>
      <div className='darkBorderBg'></div>
      <div className='darkBorderBg'></div>
      <div className='white'></div>
      <div className='border'></div>
      <div id='main'>
        <input
          placeholder='Buscar serie...'
          type='text'
          name='text'
          className='input'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete='off'
        />
        <div id='input-mask'></div>
        <div id='pink-mask'></div>
        <div className='filterBorder'></div>
        <div id='filter-icon'>
          <svg
            preserveAspectRatio='none'
            height='27'
            width='27'
            viewBox='4.8 4.56 14.832 15.408'
            fill='none'
          >
            <path
              d='M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z'
              stroke='url(#filter-grad)'
              strokeWidth='1.6'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
            <defs>
              <linearGradient
                id='filter-grad'
                x1='7'
                y1='7'
                x2='18'
                y2='18'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#01FFAE' />
                <stop offset='1' stopColor='#8224e3' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div id='search-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            strokeLinejoin='round'
            strokeLinecap='round'
            height='24'
            fill='none'
            className='feather feather-search'
          >
            <circle stroke='#01FFAE' r='8' cy='11' cx='11'></circle>
            <line stroke='#8224e3' y2='16.65' y1='22' x2='16.65' x1='22'></line>
          </svg>
        </div>
      </div>
    </div>
  )
}
