import React from 'react'
const Schoollists = props  => (

<React.Fragment> 
        {typeof props.items !== 'undefined' && Object.keys(props.items).length > 0 ? (props.items.map(school => (
       <tr key = {school.id}>
        <th scope="row">{school.id}</th>
        <td>{school.schoolName}</td>
        <td>{school.address}</td>
        <td>{school.contactPerson}</td>
        <td></td>
        <td>{school.mobileNumber}</td>
      </tr>
          ))) : (<tr><td>No itmes </td></tr>)}
  </React.Fragment>
)

export default Schoollists;
