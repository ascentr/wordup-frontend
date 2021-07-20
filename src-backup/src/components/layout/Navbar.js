
import React, { useState, useEffect, Fragment } from 'react';
import Logo from '../../images/wordupLogo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect( () => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true)
        }
    }, [])

    return (
        <div className="row no-gutters my-nav"> 
          <div className="col">
            <nav className="navbar navbar-expand-md  navbar-dark justify-content-right right-0" style={{backgroundColor:"#1b2c3e" , marginBottom:"2em"}}>
              <Link to="/">
                <img src={Logo} width={150} height="auto" alt="ascentrick logo"/>
              </Link>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#mycollapse">
                <i className="fas fa-bars"></i>
              </button>
    
              <div className="collapse navbar-collapse" id="mycollapse">
                <div className="navbar-nav align-items-right">
                  <a className="nav-item nav-link black" href="#">About</a>
                  <a className="nav-item nav-link black" href="http://www.ascentrick.com" target="blank">Contact</a>
                </div>
                <div className="navbar-nav align-items-right ml-auto">
                  { isAuth === true ? (
                    <>
                      <span> 
                      <Link to="/Logout">   Logout  <i className="sign out icon"> </i> </Link>
                      </span>
                    </>
                    ): 
                    <> 
                      <span style={{marginRight: 15 }}>
                      <Link to="/Signup">Register <i className="user plus icon"></i> </Link>
                      </span>
                      <span>
                      <Link to="/Login">Login <i className="sign in icon"></i>  </Link>
                      </span> 
                    </>
                  }
                </div>
              </div>
            </nav>
          </div>
        </div>
    
      )  
    }
    export default Navbar