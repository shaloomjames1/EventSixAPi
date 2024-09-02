import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams(); // Access the `id` parameter from the URL
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the user data based on the ID from the URL
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/useraccount/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [id]); // Dependency array ensures fetch happens when `id` changes

  if (!user) {
    return <center className='mt-5'> <div>Loading...</div> </center> ;
  }

  return (
    <div className='text-left col-12 m-5 mt-5'>
      <button className='btn btn-primary text-right' onClick={()=>navigate(-1)} >Go Back</button> <br />
      <h1>User Details</h1>
      <br />
            <div className="row">
                <div className="col-4">
                        <img 
                            src={`/uploads/userProfiles/${user.userimage}`} 
                            alt={user.username} 
                            style={{ height: '300px' , width:'250px' }} 
                        />
                </div>
                <div className="col-5">
                    <h3>Name:   <b>{user.username}</b>      </h3> <br/>
                    <h3>Email:  <b>{user.useremail}</b>     </h3>  <br/>
                    <h3>Role:   <b>{user.userrole}</b>      </h3>  <br/>
                </div>  
            </div>


    </div>
  );
};

export default UserDetail;
