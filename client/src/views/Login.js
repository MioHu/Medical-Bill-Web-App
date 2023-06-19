import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = props => {
  const {userList, handleLogin} = props;
  const [user, setUser] = useState({email:'', pwd:''});
  const [err, setErr] = useState({email:true, pwd:true});
  const [check, setCheck] = useState(false);

  /* Check two errors:
     1. Whether the input email is an existed user
     2. Whether the password is correct for the email */
  const loginCheck = e => {
    e.preventDefault();
    setCheck(true);
    setErr({email:true, pwd:true});
    if(userList.length === 0){
      setErr({...err, email:false});
    } else {
      userList.map(item => {
        if(item.email === user.email){
          setErr({...err, email:false});
          if(item.pwd === user.pwd){
            setErr({...err, pwd:false});
            handleLogin(user.email);
          }
        }
      });
    }
  }

  return(
    <>
      <h2>Log in</h2>
      <p><Link to="/">Back Home</Link></p>
      <form onSubmit={loginCheck} className="w-50 mb-3">
        <div className="form-floating mb-3">
          <input type="email" className="form-control" required="required" id="email" placeholder="email" value={user.email} onChange={e => setUser({...user, email:e.target.value})}/>
          <label for="email">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" required="required" id="pwd" placeholder="pwd" value={user.pwd} onChange={e => setUser({...user, pwd:e.target.value})}/>
          <label for="pwd">Password</label>
          {(check==true && (err.email==true || err.pwd==true)) && <p className="text-danger my-0">Incorrect email or password. Please try again.</p>}
        </div>
        <button className="btn btn-primary" type="submit">Log in</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </>
  );
};

export default Login;