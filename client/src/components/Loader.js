import React from 'react';

export const Loader = ({ size = '' }) => (
  <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem'}}>
    <div className={`preloader-wrapper ${size} active`}>
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  </div>
)