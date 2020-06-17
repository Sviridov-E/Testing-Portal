import React from 'react';
import '../styles/refresh.scss';

export const Refresh = props => (
  <div onClick={props.action} className="refresh">
    <div className="refresh-area">
      <i className={`material-icons ${props.size}-size`}>refresh</i>
    </div>
  </div>
);