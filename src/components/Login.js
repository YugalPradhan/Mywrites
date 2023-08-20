import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let navigate=useNavigate();
    const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("https://nodebackend-p6uz.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    if(json.success){
        localStorage.setItem('token',json.authToken);
        props.showAlert("Logged in successfully","success")
        navigate('/');
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  };
  const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label><span style={{color:"red"}}>*</span>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label><span style={{color:"red"}}>*</span>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-info" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
