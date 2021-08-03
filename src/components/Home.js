import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loader from './common/Loader';
import Modal from './common/Modal';
import Table from './common/Table'
import { baseUrl } from "./shared/platform.api";
const Home = () => {
    const [users, setUsers] = useState([]);
    const [userDetails, setserDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // setTimeout(async() => {
                // },500);
                let res = await axios.get(`${baseUrl}/users`);
                setUsers(res.data)
                setLoading(false);


            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchUsers()
    }, [])

    const selectUser = (data) => {
        // console.log(data);
        setserDetails(data)
    }
    const onChangeUserDetails = (e, id) => {
        setserDetails({
            ...userDetails, id: id, login: e.target.value
        });
    }
    const onSave = () => {
        const updatedData = users.map((singleUser) => {
            if (singleUser.id === userDetails.id) {
                return { ...singleUser, login: userDetails.login }
            }
            return singleUser;
        });
        setUsers(updatedData)
        // const index = users.findIndex(item => item.id === userDetails.id);
        // let userData = users[index];
        // userData.login = userDetails.login;
        // let tempUser = [...users];
        // tempUser[index] = userData;
        // this.setState({
        //     users: tempUser
        // })
    }
    const onDeleteUser = (id) => {
        const updatedData = users.filter((user) => {
            return user.id !== id;
        })
        setUsers(updatedData)

    }

    // let homeCont;
    // if (user && !loading) {
    //     homeCont = <Table />
    // }
    // else {
    //     homeCont = <Loader />
    // }
    const columns = ["ID", "Avatar", "Username", "Actions"]
    return (
        <div>
            {loading ? <Loader /> : <Table columns={columns} data={users} selectUser={selectUser} onDeleteUser={onDeleteUser} />}
            {userDetails && <Modal userDetails={userDetails} onChangeUserDetails={onChangeUserDetails} onSave={onSave} />}
        </div>
    )
}

export default Home;
