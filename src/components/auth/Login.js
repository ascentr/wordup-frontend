import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import  '../../styles/style.css';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const alert = useAlert()     
   
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('https://wordup-dict.netlify.app/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e =>{
    e.preventDefault();

    const user = {
      username : username,
      password : password
    }
/*
    var url = 'http://127.0.0.1:8000/api/auth/login'   
    var url = 'http://127.0.0.1:8000/accounts/api/auth/login' 
*/
    var url = 'https://ascentrick.pythonanywhere.com/api/auth/login'
    fetch( url , {
      method : 'POST',
      headers : { 'Content-Type': 'application/json' } ,
      body : JSON.stringify(user)
    })
    .then(data => data.json())
    .then(data => { 
      if(data){
        localStorage.clear()
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.user.username)
//        console.log('login fetched userdata', data.user)
        window.location.replace('https://wordup-dict.netlify.app/')
      } else {
        setUsername('')
        setPassword('')
        localStorage.clear()
        setErrors(true)
      }
    })
  }
  return ( 
    <>
    {loading === false }
    {loading === false && (
      <div className="ui middle aligned center aligned grid">
        <div className="four wide column">
          <h2 className="ui teal image header">
            <div className="content">
              Log-in to your account
            </div>
          </h2>
          <form className="ui large form" onSubmit={onSubmit}>
          <div className="ui segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>

                <input name='username' type='text'
                  value={username} required onChange={e => setUsername(e.target.value)} />
                  {' '}
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input name='password' type='password'
                  value={password} required onChange={e => setPassword(e.target.value)} />
                  {' '}
              </div>
            </div>
            <button className="ui fluid large teal submit button" type="submit">Login</button>
          </div>   
        </form>
        {errors === true &&
          <div className="ui message error">
            <h3>Incorrect Credentials</h3>
          </div>
        }
        <div className="ui message">
          New to us? <Link to="/Signup"> Register  </Link> 
        </div>
        </div>
      </div>
  )}
  </>
  );
};
    
export default Login;


