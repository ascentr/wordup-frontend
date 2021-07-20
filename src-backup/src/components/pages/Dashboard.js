import React, { useState, useEffect, Fragment } from 'react'

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userWords, setUserWords] = useState({})
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] =useState('true')

  useEffect(() => {
    if (localStorage.getItem('token') !== null ) {
      fetch('http://127.0.0.1:8000/api/words' , {
          method : 'GET' ,
          headers : {
            'Content-Type' : 'application/json' ,
            Authorization : `Token ${localStorage.getItem('token')}`
          }
      })
    .then(res => {
//      console.log('response code', res.status)
      if (res.status === 200 ) {
        res.json()
        .then(data => {
          setUserWords(data)
          setIsAuth(true)
          setLoading(false)
        }) 
      }      
      else {
        if (res.status === 401){
          setIsAuth(false)
          localStorage.clear();
          window.location.replace('/')
        }
      }
    })     
  }

  }, [])


/*
async function delseteWord(id) {
    try {
        let response = await fetch(`https://url/${id}`, {
            method: "DELETE",
        });
    } catch (err) {
    }
}
*/

  const deleteWord = async(id) => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/words/${id}` ,
        { method : 'DELETE' ,
          headers :  { 
            'Content-type': 'application/json' ,
            'Authorization' : `Token ${localStorage.getItem('token')}`           
            } 
        })
        console.log('response code', response.status)
        window.location.replace('http://localhost:3000/')
      } 
        catch (error) { 
          console.log(error) 
        }   
  }

  return (
    <div>
        <div className="row ">
        <div className="col-md-3"></div>
        { isAuth ?  ( 
          <div className="col-md-6" style={{padding:"3em", width:"100%" , backgroundColor:'teal'}}> 
            <h3>Saved Words</h3>
            <p> 
                {userWords.map(word => (
                  <b key={word.id}> 
                      {word.word[0].toUpperCase() + word.word.substring(1) } 
                      {<i className="bordered link red minus inverted small icon" 
                          onClick={deleteWord.bind(this, word.id)}  /> }
                      &nbsp; &nbsp;           
                  </b>
              ))}
            </p>
          </div>
          ):
          ( <> 
            <div className="col-md-6" style={{padding:"3em", backgroundColor:'green'}} >  
              Login or Register to create and access your personalised word list
            </div>
            </>)
          }
          <div className="col-md-3" styel={{color:"yellow", borderLeft:'1px Solid White'}}></div>
          </div> 
    </div>
  )
}

export default Dashboard

