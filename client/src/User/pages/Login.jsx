import axios from 'axios';
import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [Useremail, setUseremail] = useState("");
    const [Userpass, setUserpass] = useState("");
    const [isLogedIn,setisLogedIn] = useState(false);
    const notify = (error) => toast.error(error);
    const successnotify = (success) => toast.success(success);


    const navigate = useNavigate();

    const LoginSubmit = async(e) =>{
        e.preventDefault();
        if(Useremail.length >5 && Userpass.length > 6){
            try {
                const response  = await axios.post("http://localhost:5000/user/auth/login",{
                    useremail:Useremail,
                    userpassword:Userpass
                });
                successnotify("Login Successful");
                 
                localStorage.setItem('session', JSON.stringify(response.data.session));

                const userRole = response.data.session.userrole;
                if (userRole === "customer") {
                  setTimeout(() => {
                    navigate("/Shop");
                  }, 2000);
                } else if (userRole === "admin") {
                  setTimeout(() => {
                    navigate("/admin");
                  }, 2000);
                }
                // setTimeout(() => {
                //     navigate("/Shop");
                // }, 2000); 
            } catch (error) {
                if (error.response  && error.response .data && error.response.data.msg) {
                    notify(error.response .data.msg);
                } else {
                    notify("Invalid Credentials from jsx");
                }
            }
    
        }else{
            notify("Enter Valid Cradentials, The account is not found")
        }
        }
  return (
    <>
      <div class="breadcrumb-area breadcrumb-mt breadcrumb-ptb-2">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h2>Login / Register</h2>
                    <ul>
                                <li>
                                    <Link to="/">Home </Link>
                                </li>
                                <li><span> </span></li>
                                <li>
                                    <Link to="/signup">Signup </Link>
                                </li>
                                <li><span> </span></li>
                                <li className="active">Login </li>
                            </ul>
                </div>
            </div>
        </div>
        <div class="login-register-area bg-gray pt-155 pb-160">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 col-md-12 ms-auto me-auto">
                        <div class="login-register-wrapper">
                            <div class="login-register-tab-list nav">
                                <a class="active" data-bs-toggle="tab" href="#lg1">
                                    <h4> login </h4>
                                </a>
                              
                            </div>
                            <div class="tab-content">
                                <div id="lg1" class="tab-pane active">
                                    <div class="login-form-container">
                                        <div class="login-register-form">
                                            <form onSubmit={LoginSubmit}>
                                                <input type="email" name="user-email" placeholder="UserEmail" onChange={(e) => setUseremail(e.target.value)} />
                                                <input type="password" name="user-password" placeholder="Password"  onChange={(e) => setUserpass(e.target.value)} />
                                                <div class="button-box">
                                                    <div class="login-toggle-btn">
                                                        <input type="checkbox"/>
                                                        <label>Remember me</label>
                                                        <a href="#">Forgot Password?</a>
                                                    </div>
                                                    <button type="submit">Login</button>
                                                    <p>Don't Have any account?<Link to='/signup'>Register Now</Link></p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
  )
}

export default Login