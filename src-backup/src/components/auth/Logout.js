import React, {useState, useEffect, Fragment} from 'react'

const Logout = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('token') == null ) {
        window.location.replace('http://localhost:3000/login')
    } else {
        setLoading(false)
    }
  }, []);

  const handleLogout = e => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/auth/logout', {
      method: 'POST',
      headers : {
          'Content-Type' : 'application/json' ,
          Authorization : `Token ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        localStorage.clear();
        // window.location.replace('/')
        window.location.replace('http://localhost:3000/')
    })
  }

  return (
  <>
    {loading === false && (
      <div className="ui middle aligned center aligned grid">
      <div className="four wide column">
        <h2 className="ui teal image header">
          <div className="content">
          <h2>Are you sure you want to logout ?</h2>
          </div>
        </h2>
        <Fragment>

          <button className="ui large pink submit button"  onClick={handleLogout}>Logout</button>
        </Fragment>    
      </div>
      </div>
    )}
  </>
  )
}

export default Logout
