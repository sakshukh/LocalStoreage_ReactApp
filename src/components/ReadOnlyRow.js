import React from 'react'


function ReadOnlyRow({ user, handleEditClick, handleDeleteClick }) {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.avatar}</td>
            <td>
                <button className='btn btn-outline-dark' type='btn'
                    onClick={(event) => handleEditClick(event, user)}>
                    Edit
                </button>

                <button className='btn btn-outline-dark m-2' type='btn'
                    onClick={(event) => handleDeleteClick(user.id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow
