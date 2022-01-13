import React from 'react'

function EditableRow({ user, handleEditFormChange, editFormData, handleCancelClick }) {
    return (
        <tr>
            <td>{user.id}</td>
            <td><input
                name='email'
                placeholder='Enter Email'
                required='required'
                value={editFormData.email}
                onChange={handleEditFormChange}
            /></td>
            <td><input
                name='first_name'
                placeholder='Enter First Name'
                required='required'
                value={editFormData.first_name}
                onChange={handleEditFormChange}
            /></td>
            <td><input
                name='last_name'
                placeholder='Enter Last Name'
                required='required'
                value={editFormData.last_name}
                onChange={handleEditFormChange}
            /></td>
            <td><input
                name='avatar'
                placeholder='Image Url'
                required='required'
                value={editFormData.avatar}
                onChange={handleEditFormChange}
            /></td>
            <td>
                <button className='btn btn-outline-dark' type='btn'
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>

                <button className='btn btn-outline-dark m-2' type='submit'

                >
                    Save
                </button>
            </td>
        </tr >
    )
}

export default EditableRow
