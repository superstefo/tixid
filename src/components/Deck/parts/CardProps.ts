import React from 'react';
export interface CardStateI {
    opacity: number,
    cardId: string,
    imgSrc: string
  }
  
export type CardProps = {} & CardStateI;
