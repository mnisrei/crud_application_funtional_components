import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from './common/Loader';
import { getUser } from "../redux/actions/userActions"
import { isEmpty } from "../utils/isEmpty";
const Details = ({ match: { params }, users, getUser }) => {
    const { user } = users;
    let userDetail;
    useEffect(() => {
        getUser(params.id)
    }, []);
    if (!isEmpty(user)) {
        userDetail =
            <div className="card" style={{ width: "18rem" }}>
                <img src={user.avatar_url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{user.login}</h5>
                    <p className="card-text">To see the full achievements and works click the visis github button below. </p>
                    <a href={user.html_url} target="_blank" rel="noreferrer" className="btn btn-primary">Visit Github</a>
                </div>
            </div>
    } else {
        userDetail = <div className="alert alert-info" role="alert">
            No User Data Found
        </div>
    }

    return (
        <>
            {users.loading ? <Loader /> : userDetail}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => {
            return dispatch(getUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
