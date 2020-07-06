import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { BasicView } from './BasicView';
import { ChartView } from './ChartView';

export const ResultModalWindow = ({modalRef, initialize, content, loading, closeWindow, type = 'basic'}) => {
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  const views = {
    basic: <BasicView content={content}/>,
    chart: <ChartView content={content}/>
  };

  const closeClick = e => {
    e.preventDefault();
    closeWindow();
  }
  let inner = loading || !content ? <Loader/> : views[type];

  return (
    <div ref={modalRef} id="modal1" className="modal">
      <div className="modal-content">
        {
          inner
        }
      </div>
      <div className="modal-footer">
        <a href="/" onClick={closeClick} className="modal-close waves-effect waves-green btn-flat">Закрыть</a>
      </div>
    </div>
  );
}