import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = props => {
  const {userList, handleSignup} = props;
  const [user, setUser] = useState({email:"", pwd:"", confirm:""});
  const [err, setErr] = useState({email:false, pwd:false});

  const signup = e => {
    e.preventDefault();
    if(err.email===false && err.pwd===false){
      handleSignup({email:user.email, pwd:user.pwd});
    }
  };
  
  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    validate(e);
  };
  
  /* Check two errors:
     1. Whether the input email is an existed user
     2. Whether the password and confirm password match */
  const validate = e => {
    let {name, value} = e.target;
    setErr(prev => {
      let stateObj = {...prev};
      if(name==="email"){
        stateObj = {...stateObj, email:false};
      } else {
        stateObj = {...stateObj, pwd:false};
      }
      switch(name){
        case "email":
          if(userList.length !== 0){
            userList.map(item => {
              if(item.email === user.email){
                stateObj["email"] = true; 
              }
            });
            break;
          }
        case "pwd":
          if(user.confirm && value!==user.confirm){
            stateObj["pwd"] = true;
          }
          break;
        case "confirm":
          if(user.pwd && value!==user.pwd){
            stateObj["pwd"] = true;
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  return(
    <>
      <h2>Sign up</h2>
      <p><Link to="/">Back Home</Link></p>
      <form onSubmit={signup} className="w-50 mb-3">
        <div className="form-floating mb-3">
          <input type="email" className="form-control" required="required" id="email" placeholder="email" value={user.email} onChange={handleChange} onBlur={validate} name="email"/>
          <label for="email">Email address</label>
          {err.email==true && <p className="text-danger">Email has already existed.</p>}
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" required="required" id="pwd" placeholder="pwd" value={user.pwd} onChange={handleChange} onBlur={validate} name="pwd"/>
          <label for="pwd">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" required="required" id="confirm" placeholder="confirm" value={user.confirm} onChange={handleChange} onBlur={validate} name="confirm"/>
          <label for="confirm">Confirm Password</label>
          {(user.confirm && err.pwd==true) && <p className="text-danger">Password and Confirm Password doesn't match</p>}
        </div>
        <button className="btn btn-primary" type="submit">Sign up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </>
  );
};

export default Signup;