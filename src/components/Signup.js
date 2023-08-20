import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch("https://nodebackend-p6uz.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
      if(json.success){
        localStorage.setItem('token',json.authToken);
        navigate('/');
      props.showAlert("Account created successfully","success")}
      else{
       props.showAlert("Invalid Credentials","danger");
      }
  };
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
      }
  return (
    <div className="login"><form>
    <div className="mb-3">
      <h2>Signup</h2>
      <label htmlFor="name" className="form-label">
        Name
      </label><span style={{color:"red"}}>*</span>
      <input
        type="name"
        className="form-control"
        id="name"
        name="name"
        value={credentials.name}
        onChange={onChange}
      />
    </div>
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
        placeholder="Atleast 5 charachters required"
      />
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">
        Confirm Password
      </label><span style={{color:"red"}}>*</span>
      <input
        type="password"
        className="form-control"
        id="cpassword"
        name="cpassword"
        value={credentials.cpassword}
        onChange={onChange}
      />
    </div>
    <button type="submit" className="btn btn-info" onClick={handleClick}>
      Submit
    </button>
  </form></div>
  )
}

export default Signup