import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UpdateUser = () => {
  // State variables for storing user data and form inputs
  const [user, setUser] = useState(null);
  const [Username, setUsername] = useState("");
  const [Useremail, setUseremail] = useState("");
  const [Userpass, setUserpass] = useState("");
  
  // Separate states for existing and new user images
  const [existingUserImage, setExistingUserImage] = useState("");
  const [newUserImage, setNewUserImage] = useState(null);

  // Hooks for navigation and route parameters
  const navigate = useNavigate();
  const { id } = useParams(); // Extracts the user ID from the URL parameters

  // Functions for displaying notifications
  const notify = (error) => toast.error(error);
  const successnotify = (success) => toast.success(success);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare FormData object for file upload
    const formData = new FormData();
    formData.append("username", Username);
    formData.append("useremail", Useremail);
    formData.append("userpassword", Userpass);

    // Append new image only if a new file is selected
    if (newUserImage) {
      formData.append("userimage", newUserImage);
    }

    try {
      // Send PUT request to update user data
      const response = await axios.put(`http://localhost:5000/api/useraccount/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      successnotify(response.data.msg); // Show success notification
      setTimeout(() => {
        navigate("/list"); // Redirect to login page after a delay
      }, 4000);
    } catch (error) {
      // Handle errors and display notifications
      if (error.response && error.response.data && error.response.data.msg) {
        notify(error.response.data.msg);
      } else {
        notify("Update Failed");
      }
    }
  };

  // Fetch user data when the component mounts or `id` changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/useraccount/${id}`);
        const userData = response.data;
        setUser(userData);
        setUsername(userData.username); // Initialize state variables with fetched user data
        setUseremail(userData.useremail); 
        setUserpass(userData.userpassword);
        setExistingUserImage(userData.userimage);
      } catch (error) {
        console.error('Error fetching user data', error);
        notify("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <center className='mt-5'> <div>Loading...</div> </center>;
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Update Form EventSphere</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">Name</label>
            <input 
              type="text" 
              value={Username} 
              className="form-control" 
              name="user-name" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              value={Useremail} 
              className="form-control" 
              placeholder="Email" 
              aria-describedby="emailHelp" 
              onChange={(e) => setUseremail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              value={Userpass} 
              className="form-control" 
              placeholder="Password" 
              onChange={(e) => {setUserpass(e.target.value)}} 
              required
            />
          </div>
          <div className="row mt-3 mb-3">
            <div className="col-6">
            <div className="mb-3">
            <label htmlFor="exampleInputImage1" className="form-label">Image</label>
            <input 
              type="file" 
              name="image" 
              className="form-control mb-2" 
              onChange={(e) => setNewUserImage(e.target.files[0])} 
            />
          </div>
            </div>
            <div className="col-4">
            {(newUserImage || existingUserImage) && (
              <img 
                src={newUserImage ? URL.createObjectURL(newUserImage) : `/uploads/userProfiles/${existingUserImage}`} 
                alt={Username} 
                style={{ height: '100px' }} 
              />
            )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default UpdateUser;
