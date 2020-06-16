import React, { useEffect } from 'react';
import { Loader } from './Loader';

export const ResultModalWindow = ({modalRef, initialize, content, loading, closeWindow}) => {
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  const expand = init => { 
    if(init === null) return 'Шыш';
    let array = [];
    let key = 0;
  
    function recursion(obj, indent){
      
      if(obj.hasOwnProperty('value')){    
        array.push(<div key={key} className={`indent-${indent}`}><strong>{obj.title} : </strong><span>{obj.value}</span></div>);
        key++;
      } else {
        if(!array.length){
          array.push(<h4 key={key} className="center">{obj.title}</h4>);
          key++;
        } else {
          array.push(<div key={key} className={`indent-${indent}`}><strong>{obj.title} : </strong></div>);
          key++;
        }          
        Object.values(obj).forEach(prop => {
          if(typeof prop === 'string') return;
          recursion(prop, indent+1);
        })
      }
    }

    recursion(init, 0);
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