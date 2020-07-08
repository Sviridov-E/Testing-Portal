import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { BasicView } from './BasicView';
import { ChartView } from './ChartView';
import { AdditionalInfo } from './AdditionalInfo';
import '../../styles/resultModalWindow.scss';

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
  const additionalInfo = content && content.additionalInfo ? {
    staticInfo: content.additionalInfo.staticInfo,
    dynamicInfo: content.additionalInfo.dynamicInfo || null
  } : null;

  let inner = loading || !content ? <Loader/> : views[type];

  return (
    <div ref={modalRef} id="modal1" className="modal resultModalWindow">
      <div className="modal-content">
        {
          inner
        }
        {
          additionalInfo &&
          <>
            <hr/>
            <AdditionalInfo
              staticInfo={additionalInfo.staticInfo}
              remain={additionalInfo.dynamicInfo}
            />
          </>
        }
      </div>
      <div className="modal-footer">
        <a href="/" onClick={closeClick} className="modal-close waves-effect waves-green btn-flat">Закрыть</a>
      </div>
    </div>
  );
}