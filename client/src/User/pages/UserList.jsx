import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [UserData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/useraccount/");
                const users = await res.data;
                setUserData(users);
                // console.log(users);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchData();
    }, [UserData]); 

    const Delete_single_user = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/useraccount/${id}`);
        } catch (error) {
            console.error("Error deleting user", error);
        }
    }

    return (
        <>
            <center className="mt-5 mb-5">
                <h1>User List</h1>
                <Link to="/">
                    <button className="btn btn-primary">ADD User</button>
                </Link>
            </center>
            <table className="table table-striped table-hover container mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Role</th>
                        <th scope="col">Image</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {UserData.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td><Link to={`/user/${user._id}`}>{user.username}</Link></td>
                            <td>{user.useremail}</td>
                            <td>{user.userpassword}</td>
                            <td>{user.userrole}</td>
                            <td>
                                <img 
                                    src={`/uploads/userProfiles/${user.userimage}`} 
                                    alt={user.username} 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                />
                            </td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => Delete_single_user(user._id)}>Delete</button>
                                <span> </span>
                                <Link className="btn btn-primary btn-sm" to={`/update/${user._id}`}>Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default UserList;
