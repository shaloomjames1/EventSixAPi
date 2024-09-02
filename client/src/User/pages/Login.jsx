import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Signup = () => {
  const [Useremail, setUseremail] = useState("");
  const [Userpass, setUserpass] = useState("");

  const navigate = useNavigate(); 

  const notify = (error) => toast.error(error);
  const successnotify = (success) => toast.success(success);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("useremail", Useremail);
    formData.append("userpassword", Userpass);
    try {
        const response = await axios.post("http://localhost:5000/api/useraccount/login/", formData);
        successnotify(response.data.msg);
        console.log(response.data.msg)
        setTimeout(() => {
            navigate("/list"); 
        }, 4000);
    } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
            notify(error.response.data.msg);
        } else {
            notify("Registration Failed");
            console.log(response.data)
        }
    }

  }


  return (
    <>
    <div className="container mt-5">
            <h1>Login From EventSphere </h1>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input name="user-email" class="form-control" placeholder="Email" type="email" onChange={(e) => setUseremail(e.target.value)} />
            </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" name="user-password" placeholder="Password" onChange={(e) => setUserpass(e.target.value)} />
            </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <p>Already Have any account?<Link to='/signup'>Signup Now</Link></p>
    </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default Signup