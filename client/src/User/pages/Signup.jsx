    import React, { useState } from 'react';
    import { Link ,useNavigate } from 'react-router-dom';
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

            // if (Username.length > 3) {
            //     if (Useremail.length > 5) {
            //         if (Userpass.length > 6) {
                        // if (Userimage) {
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
                                successnotify(response.data.msg);
                                console.log(response.data.msg)
                                setTimeout(() => {
                                    navigate("/login"); 
                                }, 4000);
                            } catch (error) {
                                if (error.response && error.response.data && error.response.data.msg) {
                                    notify(error.response.data.msg);
                                } else {
                                    notify("Registration Failed");
                                    console.log(response.data)
                                }
                            }
                        // } else {
                        //     notify("Your image is not selected");
                        // }
            //         } else {
            //             notify("Your password is weak");
            //         }
            //     } else {
            //         notify("Enter your valid email");
            //     }
            // } else {
            //     notify("Enter your full name");
            // }
        };

        return (
            <>
                <div className="breadcrumb-area breadcrumb-mt breadcrumb-ptb-2">
                    <div className="container">
                        <div className="breadcrumb-content text-center">
                            <h2>Login / Register</h2>
                            <ul>
                                <li>
                                    <Link to="/">Home </Link>
                                </li>
                                <li><span> </span></li>
                                <li>
                                    <Link to="/login">Login </Link>
                                </li>
                                <li><span> </span></li>
                                <li className="active">Register </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="login-register-area bg-gray pt-155 pb-160">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ms-auto me-auto">
                                <div className="login-register-wrapper">
                                    <div className="login-register-tab-list nav">
                                        <a data-bs-toggle="tab" href="#lg2">
                                            <h4> register </h4>
                                        </a>
                                    </div>
                                    <div className="tab-content">
                                        <div id="lg1" className="tab-pane active">
                                            <div className="login-form-container">
                                                <div className="login-register-form">
                                                    <form onSubmit={handleSubmit}>
                                                        <input type="text" name="user-name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                                        <input name="user-email" placeholder="Email" type="email" onChange={(e) => setUseremail(e.target.value)} />
                                                        <input type="password" name="user-password" placeholder="Password" onChange={(e) => setUserpass(e.target.value)} />
                                                        <input type="file" name="image" onChange={(e) => setUserImage(e.target.files[0])} />
                                                        <div className="button-box">
                                                            <button type="submit">Register</button>
                                                            <p>Already Have any account?<Link to='/login'>Login Now</Link></p>
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
        );
    };

    export default Signup;
