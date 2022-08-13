import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: ""}) 
     let navigate = useNavigate();
    //  let host=process.env.REACT_APP_HOST || "http://localhost:4000"
     let host=process.env.NODE_ENV === 'production' ? 'https://inote-book1.herokuapp.com' : 'http://localhost:4000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.authtoken){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/login");

        }
        else{
            if(!json.errors){
                alert(json.Error); 
            
            }
            else{
                alert(json.errors[0].msg); 
            }
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">
                            name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={credentials.name}
                            onChange={onChange}
                            id="name"
                            name="name"
                            
                        />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            value={credentials.email}
                            onChange={onChange}
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                        />
                        
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
            </div>
        </div>
    );
};

export default Signup;
