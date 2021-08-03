import React from 'react';
import { Link } from "react-router-dom"
import { Edit, DeleteForever, Visibility } from '@material-ui/icons';

const Table = ({ columns, data, selectUser, onDeleteUser }) => {
    let tableRow;
    let tableCols = columns.map((col, index) => <th key={index} scope="col">{col}</th>);
    if (data.length > 0) {
        tableRow = data.map(({ id, avatar_url, login, url }) => {
            return (
                <tr key={id}>
                    <th scope="row">{id}</th>
                    <td> <img style={{ width: "100px", height: "100px", borderRadius: "50%" }} src={avatar_url} alt="avatar" /></td>
                    <td>{login}</td>
                    <td>
                        <Edit onClick={(e) => {
                            e.preventDefault();
                            selectUser({ id, login })
                        }} type="button" data-toggle="modal" data-target="#exampleModal" />
                        <DeleteForever onClick={() => onDeleteUser(id)} type="button" />
                        <Link to={`/details/${login}`}><Visibility /></Link>
                    </td>
                </tr>
            );
        });
    }
    else {
        tableRow = <tr><td>No Data</td></tr>
    }
    return (
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        {tableCols}
                    </tr>
                </thead>
                <tbody>
                    {tableRow}
                </tbody>
            </table>
        </>
    )
}

export default Table;
