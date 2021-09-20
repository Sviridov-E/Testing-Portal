import React from 'react';
import { Loader } from './Loader';
import { useHistory } from 'react-router-dom';
import '../styles/resultTable.scss';
import { useSortTable } from '../hooks/sortTable.hook';

/*
  Таблица принимает два пропса, tableData u loading. TableData - объект, содержащий два поля:
    profiles: представляет массив из объектов, в каждом объекте обязательно должно быть поле '_id', чтобы осуществлять редирект на страницы пользователей
  а также должно быть поле 'values' - массив со значениями, порядок значений в массиве должен быть такой же как в tableHead
    tableHead: массив со значениями, которые будут представлять колонки в таблице

  Значение loading - логическое, индицирует готовность данных.
*/


export const ResultTable = ({ tableData, setTableData, loading }) => {
  const { tableHead, profiles } = tableData;

  const {sortTable, direction, sortedFieldIndex} = useSortTable(setTableData);

  const handleClick = event => {
    
    const fieldIndex = event.currentTarget.dataset.id;
    sortTable(fieldIndex);
  }

  const history = useHistory();
  const toUserPage = id => {
    history.push(`/users/profile/${id}`);
  }

  if(loading || !tableHead ) return <Loader size="big"/>

  return (
    <div className="container result-table-wrapper">
      <table className="highlight result-table">
        <thead>
          <tr>
              {
                tableHead.map((item, ind) =>{
                if(sortedFieldIndex !== null && +sortedFieldIndex === +ind) {
                  return <th data-id={ind} key={ind} onClick={handleClick}><div>{item} <i className="small material-icons">arrow_drop_{direction}</i></div></th>
                }
                return <th data-id={ind} key={ind} onClick={handleClick}><div>{item} <div className="indent"></div></div></th>
                })
              }
          </tr>
        </thead>

        <tbody>
          {
            profiles.map((item, ind) => {
              return (
                <tr key={ind} onClick={()=>{toUserPage(item._id)}}>
                  {
                  item.values.map((value, ind) => <td key={ind}>{value}</td>)
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}