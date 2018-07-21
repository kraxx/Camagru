import React from 'react';
import '../../../public/css/title.css';

export const Title = ({children}) => (
  <div className='titleComponent'>
    <p>{children}</p>
    <hr/>
  </div>
)