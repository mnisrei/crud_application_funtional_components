import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Loader from './common/Loader';
import Modal from './common/Modal';
import Table from './common/Table';
import { deleteUser, editUser, getAllUsers } from "../redux/actions/userActions"

const Home = ({ users, getAllUsers, editUser, deleteUser }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        getAllUsers()
    }, [])

    const selectUser = (data) => {
        setUserDetails(data)
    }
    const onChangeUserDetails = (e, id) => {
        setUserDetails({
            ...userDetails, id: id, login: e.target.value
        });
    }
    const onSave = () => {
        editUser(userDetails)
    }
    const onDeleteUser = (id) => {
        deleteUser(id)
    }

    const columns = ["ID", "Avatar", "Username", "Actions"]
    return (
        <div>
            {users.loading ? <Loader /> : <Table columns={columns} data={users.users} selectUser={selectUser} onDeleteUser={onDeleteUser} />}
            {userDetails && <Modal userDetails={userDetails} onChangeUserDetails={onChangeUserDetails} onSave={onSave} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        editUser: (userDetails) => dispatch(editUser(userDetails)),
        deleteUser: (id) => dispatch(deleteUser(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
