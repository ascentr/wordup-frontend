import React, { useState, useEffect } from 'react';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading ] = useState(true);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null ) {
          window.location.replace('https://wordup-dict.netlify.app/')
        } else {
            setLoading(false)    
        }
    }, [])

    const onSubmit = e => {
        if (password === password2 ) {            
            const user = {
                username : username,
                email : email,
                password : password
            }
/*          var url = 'http://127.0.0.1:8000/accounts/api/auth/register'
            var url = 'http://127.0.0.1:8000/api/auth/register'
 */            
            var url = 'https://ascentrick.pythonanywhere.com/api/auth/register'
            fetch(url , {
                method : 'POST' ,
                headers : {
                  'Content-Type': 'application/json'
                },
                body : JSON.stringify(user)
            })
            .then(res => res.json() )
            .then(data => {
                console.log(data)
                if(data){
                    localStorage.clear();
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('username', data.user.username)
                    window.location.replace('https://wordup-dict.netlify.app/')

                } else {
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setPassword2('');
                    localStorage.clear();
                    setErrors(true);
                    console.log(errors)                   
                }
            })

        } else {
            alert (`passwords dont't match`)
        }
    }


    return (
        <>
          <div className="ui middle aligned center aligned grid">
            <div className="four wide column">
              <h2 className="ui teal image header">
                <div className="content">
                  Create New Account
                </div>
              </h2>
              <form className="ui large form" onSubmit={onSubmit}>
                <div className="ui segment">
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>    
                      <input name='username' type='text'  placeholder="Username"
                        value={username} required onChange={e => setUsername(e.target.value)} />
                        {' '}
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="mail icon"></i>
    
                      <input name='email' type='text' placeholder="Email"
                        value={email} required onChange={e => setEmail(e.target.value)} />
                        {' '}
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input name='password' type='password'  placeholder="Password"
                        value={password} required onChange={e => setPassword(e.target.value)} />
                        {' '}
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input name='password' type='password'  placeholder="Confirm Password"
                        value={password2} required onChange={e => setPassword2(e.target.value)} />
                        {' '}
                    </div>
                  </div>
                  <button className="ui fluid large teal submit button" type="submit">Create Account</button>
              </div>   
            </form>

            </div>
          </div>
      </>
    )
}

export default Signup
