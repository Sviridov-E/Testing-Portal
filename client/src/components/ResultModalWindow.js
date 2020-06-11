import React, { useEffect } from 'react';
import { Loader } from './Loader';

export const ResultModalWindow = ({modalRef, initialize, content, loading, closeWindow}) => {
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  const expand = init => { 
    if(init === null) return 'Шыш';
    let array = [];
  
    function dig(obj, indent){
      
      if(obj.hasOwnProperty('value')){    
        array.push(<div className={`indent-${indent}`}><strong>{obj.title}: </strong><span>{obj.value}</span></div>);
      } else {
        if(!array.length){
          array.push(<h4 className="center">{obj.title}</h4>);
        } else {
          array.push(<div className={`indent-${indent}`}><strong>{obj.title}: </strong></div>);
        }          
        Object.values(obj).forEach(prop => {
          if(typeof prop === 'string') return;
          dig(prop, indent+1);
        })
      }
    }

    dig(init, 0);
    return array;  
  }
  const closeClick = e => {
    e.preventDefault();
    closeWindow();
  }
  let inner = loading ? <Loader/> : (
    <div>{expand(content)}</div>
  );

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