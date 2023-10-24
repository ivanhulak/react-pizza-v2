import React from 'react';
import { PropsWithChildren } from 'react'
import cn from 'classnames';

type ButtonProps = {
   className: string;
   onClickFn?: () => void;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = 
({children, className, onClickFn}) => {
   return (
      <button onClick={onClickFn} className={cn('common-button', className)}>
         {children}
      </button>
   );
}