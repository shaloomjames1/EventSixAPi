import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserList = () => {
    const [UserData,setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get("http://localhost:5000/api/useraccount/");
            const users = await res.data;
            
            setUserData(users);
            console.log(users);
          } catch (error) {
            console.error("Error fetching user data", error);
          }
        };
        fetchData();
  },[]);

    return (
    
    <>
      <div className="login-register-area bg-gray pt-155 pb-160">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper">
                <div className="login-register-tab-list nav">
                  <a data-bs-toggle="tab" href="#lg2">
                    <h4> User List </h4>
                  </a>
                </div>
                <div className="tab-content">
                  <div id="lg1" className="tab-pane active">
                    <div className="login-form-container">
                      <div className="login-register-form">
                        <div className="container-fluid">
                          <div className="container-fluid">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">name</th>
                                  <th scope="col">email</th>
                                  <th scope="col">password</th>
                                  <th scope="col">role</th>
                                  <th scope="col">image</th>
                                  <th scope="col">createdAt</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              {UserData.map((user,index)=>(
                                <tr key={index+1}>
                                <th scope="row">{index+1}</th>
                                <td>{user.username}</td>
                                <td>{user.useremail}</td>
                                <td>{user.userpassword}</td>
                                <td>{user.userrole}</td>
                                <td>{user.userimage}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                  <button className='btn btn-primary btn-sm'>update</button> <span>  </span>
                                  <button className='btn btn-danger btn-sm'>delete</button>
                                </td>
                              </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList