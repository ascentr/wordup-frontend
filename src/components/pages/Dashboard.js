import React, { useState, useEffect, Fragment } from 'react'

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userWords, setUserWords] = useState({})
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] =useState('true')

  useEffect(() => {
    if (localStorage.getItem('token') !== null ) {
      fetch('https://ascentrick.pythonanywhere.com/api/words/' , {
          method : 'GET' ,
          headers : {
            'Content-Type' : 'application/json' ,
            Authorization : `Token ${localStorage.getItem('token')}`
          }
      })
    .then(res => {
      console.log('response code useEffect in Dash', res.status)
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

  const deleteWord = async(id) => {
    try {
      let response = await fetch(`https://ascentrick.pythonanywhere.com/api/words/${id}` ,
        { method : 'DELETE' ,
          headers :  { 
            'Content-type': 'application/json' ,
            'Authorization' : `Token ${localStorage.getItem('token')}`           
            } 
        })
        console.log('response code', response.status)
        window.location.replace('https://wordup-dict.netlify.app/')

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
                  <span key={word.id} className="saved-word"> 
                      {word.word[0].toUpperCase() + word.word.substring(1)}  &nbsp;
                      {<i className="bordered link red minus inverted small icon" 
                          onClick={deleteWord.bind(this, word.id)}  /> }
                      &nbsp; &nbsp;           
                  </span>
              ))}
            </p>
          </div>
          ):
          ( <> 

            </>)
          }
           <div className="col-md-3"></div>
        </div> 
    </div>
  )
}

export default Dashboard

