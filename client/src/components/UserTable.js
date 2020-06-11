import React, { useState } from 'react';
import { Loader } from './Loader';
import { useHistory } from 'react-router-dom';

export const UserTable = ({ usersList, setUsersList, loading }) => {
  const [ sortStatus, setSortStatus ] = useState({
    fields: {
      firstName: null,
      lastName: null,
      email: null
    },
    lastField: null,
    direction: 'down',
  });
  const history = useHistory();
  const sortUsers = (event) => {
    const clickedElement = event.target.closest('th'),
          clickedField = clickedElement.dataset.field;
    const newState = {
      fields: {
        firstName: null,
        lastName: null,
        email: null,
        [clickedField]: `keyboard_arrow_down`
      },
      lastField: clickedField,
      direction: 'down',
    };    
    if(clickedField === sortStatus.lastField){
      newState.direction = sortStatus.direction === 'down' ? 'up' : 'down';
      newState.fields[clickedField] = `keyboard_arrow_${newState.direction}`;
      
      /* Sorting */
      setUsersList(usersList => {
        return usersList.sort((a, b) => {
          let result;
          if(newState.direction === 'down'){
            if(a[clickedField] > b[clickedField]) result = 1;
            if(a[clickedField] < b[clickedField]) result = -1;
            if(a[clickedField] === b[clickedField]) result = 0;
          } else {
            if(a[clickedField] > b[clickedField]) result = -1;
            if(a[clickedField] < b[clickedField]) result = 1;
            if(a[clickedField] === b[clickedField]) result = 0;
          }
          return result;
        });
      })
      /********* */

    } else {

      /* Sorting */
      setUsersList(usersList => {
        return usersList.sort((a, b) => {
          let result;
          if(newState.direction === 'down'){
            if(a[clickedField] > b[clickedField]) result = 1;
            if(a[clickedField] < b[clickedField]) result = -1;
            if(a[clickedField] === b[clickedField]) result = 0;
          } else {
            if(a[clickedField] > b[clickedField]) result = -1;
            if(a[clickedField] < b[clickedField]) result = 1;
            if(a[clickedField] === b[clickedField]) result = 0;
          }
          return result;
        });
      })
      /********* */

    }
    setSortStatus(newState);
  }

  if(loading){
    return <Loader size='big'/>
  }

  const handleClick = event => {
    const id = event.target.closest('tr').dataset.id;
    history.push(`/users/profile/${id}`);
  }

  return (
    <div className="container user-table">
      <table className="highlight">
        <thead>
          <tr onClick={sortUsers}>
              <th data-field='number'><div>№</div></th>
              <th data-field='firstName'><div>Имя <i className="small material-icons">{sortStatus.fields.firstName}</i></div></th>
              <th data-field='lastName'><div>Фамилия <i className="small material-icons">{sortStatus.fields.lastName}</i></div></th>
              <th data-field='email'><div>Адрес почты <i className="small material-icons">{sortStatus.fields.email}</i></div></th>
          </tr>
        </thead>
        <tbody onClick={handleClick}>
        {
            !loading && (usersList.map((user, ind) => {
              const firstName = user.firstName,
                    lastName = user.lastName,
                    email = user.email,
                    id = user._id;
              return (
                <tr data-id={id} key={user._id}>
                    <td>{ind + 1}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                </tr>                
              );
            }))
          }
        </tbody>
      </table>
    </div>
  );
}