import React from 'react';
import { Loader } from './Loader';
import { useHistory } from 'react-router-dom';
import '../styles/resultTable.scss';

export const ResultTable = ({ tableData, loading }) => {
  const { tableHead, profiles } = tableData;

  const history = useHistory();

  const toUserPage = id => {
    history.push(`/users/profile/${id}`);
  }

  if(loading || !tableHead ) return <Loader size="big"/>

  return (
    <table className="container highlight result-table">
      <thead>
        <tr>
            {
              tableHead.map((item, ind) =>{
                return <th key={ind}>{item}</th>
              })
            }
        </tr>
      </thead>

      <tbody>
        {
          profiles.map((item, ind) => {
            return (
              <tr key={ind} onClick={()=>{toUserPage(item._id)}}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{`${item.gradeNumber} ${item.gradeLetter}`}</td>
                {
                  item.result.map((value, ind) => <td key={ind}>{value}</td>)
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}