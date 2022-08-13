import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  let host=process.env.REACT_APP_HOST || "http://localhost:4000"
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.authtoken) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      

      
    }
     else {
      alert("invalid credentials");
      
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      
      <div className="container">
      <span className="far fa-user btn btn-success btn-lg" aria-hidden="true"></span>
        <form onSubmit={handleSubmit} className="col-md-6">
          <div className="mb-3">
          
            <label htmlFor="email" className="form-label">
              Email address
            </label><br/>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      <span className="glyphicon glyphicon-user"></span>
      </div>
    </>
  );
};

export default Login;
