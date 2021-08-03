import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './common/Loader';
import { baseUrl } from "./shared/platform.api";
import { isEmpty } from "../utils/isEmpty";

const Details = (props) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const {match:{params}} = props
        const fetchUserDetail = async () => {
            try {
                setLoading(true);
                let res = await axios.get(`${baseUrl}/users/${params.id}`);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        fetchUserDetail();
    }, [props]);

    let userDetail;
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
            {loading ? <Loader /> : userDetail}
        </>
    )
}


export default Details;
