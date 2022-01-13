import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux'
import EditableRow from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'

function User() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)
    const [result, setResult] = useState(null);
    const [editUserId, setEditUserId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""

    })
    const [page, setPage] = useState(1)
    let totalPage;


    if (userData.user) {
        localStorage.setItem('data', JSON.stringify(userData.user.data))
        totalPage = userData.user.total_pages
    }


    useEffect(() => {
        dispatch(fetchUsers(page))
        setResult(JSON.parse(localStorage.getItem('data')))
        // setTotalPage(userData.user.total_pages)

        return (localStorage.clear())
    }, [])
    console.log(page);

    const handleEditFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)

    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()
        const editedUser = {
            id: editUserId,
            email: editFormData.email,
            first_name: editFormData.first_name,
            last_name: editFormData.last_name,
            avatar: editFormData.avatar
        }

        const newUser = [...result]

        const index = result.findIndex((user) => user['id'] === editUserId)

        newUser[index] = editedUser

        localStorage['data'] = JSON.stringify(newUser)

        setResult((JSON.parse(localStorage.getItem('data'))))
        setEditUserId(null)

    }

    const handleEditClick = (event, user) => {
        event.preventDefault()
        setEditUserId(user.id)

        const formValues = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar
        }
        setEditFormData(formValues)
    }

    const handleDeleteClick = (userId) => {
        const newUser = [...result]
        const index = result.findIndex((user) => user['id'] === userId)

        newUser.splice(index, 1)
        console.log(newUser);
        localStorage['data'] = JSON.stringify(newUser)

        setResult((JSON.parse(localStorage.getItem('data'))))


    }

    const handleCancelClick = () => {
        setEditUserId(null)
    }

    const clickPrevButton = () => {
        dispatch(fetchUsers(page - 1))
        setResult(result => result = JSON.parse(localStorage.getItem('data')))
        setPage(page => page - 1)
    }

    const clickNextButton = () => {
        if (page < totalPage) {
            dispatch(fetchUsers(page + 1))
            // setPage(page + 1)
            setPage((page) => (page + 1))
        }
        // localStorage.setItem('data', JSON.stringify(userData.user.data))
        setResult((result) => (result = (JSON.parse(localStorage.getItem('data')))))
    }


    return (
        userData.loading ? <h2>Loading</h2>
            : userData.error ? <h2>{userData.error}</h2>
                : (<div className='container'>
                    <h1>User List</h1>
                    <form onSubmit={handleEditFormSubmit}>
                        <table className='table table-hover table-bordered table-striped'>
                            <thead>
                                <tr className='text-light bg-dark'>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Image Link</th>
                                    <th>Edit/Delete</th>

                                </tr>
                            </thead>
                            {console.log(page, totalPage)}
                            <tbody>
                                {userData.user && result ? (

                                    result.map(user => {

                                        return (<Fragment key={user.id}>
                                            {editUserId === user.id ?
                                                <EditableRow user={user}
                                                    editFormData={editFormData}
                                                    handleEditFormChange={handleEditFormChange}
                                                    handleCancelClick={handleCancelClick}
                                                />
                                                : <ReadOnlyRow user={user}
                                                    handleEditClick={handleEditClick}
                                                    handleDeleteClick={handleDeleteClick}
                                                />}
                                        </Fragment>)

                                    })
                                ) : false}

                            </tbody>

                        </table>
                    </form>


                    <div className='container justify-content-between d-flex my-3'>
                        <button type='btn' className='btn btn-dark'
                            onClick={clickPrevButton}
                            disabled={page <= 1}
                        >&larr; Previous</button>

                        <button type='btn' className='btn btn-dark'
                            onClick={clickNextButton}
                            disabled={page >= totalPage}
                        >Next &rarr;</button>

                    </div>
                </div>
                )
    )
}

export default User
