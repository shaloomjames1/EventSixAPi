    import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Useremail, setUseremail] = useState("");
  const [Userpass, setUserpass] = useState("");
  const [Userimage, setUserImage] = useState("");
  
  const navigate = useNavigate(); 

  const notify = (error) => toast.error(error);
  const successnotify = (success) => toast.success(success);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", Username);
    formData.append("useremail", Useremail);
    formData.append("userpassword", Userpass);
    // formData.append("userrole", 'customer');
    formData.append("userimage", Userimage);

    try {
        const response = await axios.post("http://localhost:5000/api/useraccount/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data.msg)
        successnotify(response.data.msg);
        setTimeout(() => {
            navigate("/login"); 
        }, 4000);

    } catch (error) {
        if (error.response && error.response.data && error.response.data.err) {
            notify(error.response.data.err);
        } else {
            notify("Registration Failed");
        }
    }

  }


  return (
    <>
    <div className="container mt-5">
            <h1>Signup From EventSphere </h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputName1" class="form-label">Name</label>
            <input type="text" class="form-control" name="user-name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input  type="email" class="form-control"  placeholder="Email" aria-describedby="emailHelp" onChange={(e) => setUseremail(e.target.value)} />
            </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" placeholder="Password" onChange={(e) => setUserpass(e.target.value)} />
            </div>
          <div class="mb-3">
            <label for="exampleInputImage1" class="form-label">Image</label>
            <input type="file" name="image" class="form-control" onChange={(e) => setUserImage(e.target.files[0])} />
            </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <p>Already Have any account?<Link to='/login'>Login Now</Link></p>
    </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default Signup