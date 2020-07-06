import React from 'react';

export const BasicView = ({content}) => {
    const expand = init => { 
        if(init === null) return;
        let array = [];
        let key = 0;
      
        function recursion(obj, indent){
          
          if(obj.hasOwnProperty('value')){    
            array.push(<div key={key} className={`indent-${indent}`}><strong>{obj.title}: </strong><span>{obj.value}</span></div>);
            key++;
          } else {
            if(!array.length){
              array.push(<h4 key={key} className="center">{obj.title}</h4>);
              key++;
            } else {
              array.push(<div key={key} className={`indent-${indent}`}><strong>{obj.title || 'Показатели'}: </strong></div>);
              key++;
            }
            let values = Array.isArray(obj) ? obj : Object.values(obj);          
            values.forEach(prop => {
              if(typeof prop === 'string') return;
              recursion(prop, indent+1);
            })
          }
        }
    
        recursion(init, 0);
        return array;  
    }

    return <div>{expand({...content.scales, title: content.title})}</div>
};