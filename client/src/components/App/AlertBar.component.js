import React, { Component } from 'react';
import '../../../public/css/alert.css';

const AlertBar = ({ alert }) => (
  <div className={`alertBox ${alert.type}`}>
    {alert.message &&
      <p>{alert.message}</p>
    }    
  </div>
)

export default AlertBar;