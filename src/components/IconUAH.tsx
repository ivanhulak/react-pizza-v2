import React from 'react';

type IconUAHProps = {
   color: string;
   className?: string;
}

export const IconUAH: React.FC<IconUAHProps> = ({ color, className }) => {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
         viewBox="0 0 96.08 122.88">
         <title>ukraine-hryvnia</title>
         <path
            d="M67.41,55.44l-14.8,12H96.08V80.64H39.7c-3.76,2.84-6,6.3-6,10.71,0,7.56,6,11.66,16.71,11.66,9.13,0,17-4.4,23.3-13.53L91,101.14c-9.43,14.5-26.46,21.74-42.53,21.74-21.11,0-36.84-10.07-36.84-26.77a24.07,24.07,0,0,1,5.66-15.44H0V67.44H27.71l15.13-12H0V42.24H56.07c4.1-3.77,6-7.24,6-11.34,0-6.6-6-11.33-15.13-11.33-8.83,0-16.37,5-21.74,13.53L8.5,21.74C17.64,7.24,32.44,0,48.51,0c21.73,0,35.9,11.34,35.9,26.77a26,26,0,0,1-5,15.44h16.7V55.44Z"
            fill={color} />
      </svg>
   );
}