import React,  {useEffect, useState , useContext  } from 'react';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import  '../../styles/style.css';
//import Synonyms from './Synonyms';
//import Words from './components/Words';
//import { wordsData } from './components/wordsData';

const Search = () =>{
  const [search, setSearch ] = useState('')
  const [meaning, setMeaning] = useState([])
  const [word , setWord] = useState('')
  const [example, setExample] = useState('')
  const [synonyms, setSynonyms] = useState([])
// const [checkArray, setCheckArray]  = useState([])
  const history = useHistory()


  const alert = useAlert()

  useEffect( ()=> {
    getWord()
  }, [word], [synonyms]);
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    //  var search = search[0].toUpperCase()+search.substr(1)
    setWord(search)
    setSearch('')  
  }
  
  const updateSearch = (e) =>{
    setSearch(e.target.value)
    setWord("")
    setMeaning([])
    setSynonyms([])
    setExample("")
  }
  
  //  Iterates over data object to extract definations, synonyms etc.  
  function iterateObject(data) {
    for (var item in data) {
      if (typeof(data[item]) == "object"){
        if (item === "synonyms"){
          var synonyms = data[item]
          setSynonyms(synonyms)
        }
        iterateObject(data[item])
      }
      else 
      {
        if (item === "definition") {
          var meaning = data[item]
          setMeaning(meaning)
        }
        if (item === "example"){
          var example = data[item]
          setExample(example)
        }
      }    
    }
  }
  
  
    /*fetches the meaning of search word from dictionary api  for iterate */
  const getWord = async() => {
    if (word !== '') {
      setWord(word)
      try {
        const response = await fetch(`https://mydictionaryapi.appspot.com/?define=${word}`)
        const data = await response.json()
        iterateObject(data)

      } catch(error) {
        let message = "Word NOT Found - Check spellings or connection"
//        alert.error(message)
        setMeaning(message)
        console.log(error)
      }
    }
  }
  
 //save a dictionary searched word to personalised word list  

  const saveWord = async() => {
    const username = localStorage.getItem('username')
    console.log('body object', word, meaning, username)
    let token = localStorage.getItem('token')

    if (token){
      let bodyData = {  word, meaning, username }
      try {
        let response = await fetch(`https://ascentrick.pythonanywhere.com/api/words/` ,
          { method : 'POST' ,
            headers :  { 
              'Content-type': 'application/json' ,
              'Authorization' : `Token ${token}`           
              } ,   
              body : JSON.stringify(bodyData)
          } ,)
          console.log('response code saveWord func', response.status)
          alert.show( `${word}  has been saved`, {
            type: 'info',
          })
         window.location.replace('https://wordup-dict.netlify.app/')
        } 
          catch (error) { 
            console.log(error) 
          }   
      } else {
        alert.show(' Please login or register to Save word to personlised liste ', {
          type: 'info',
        })
      }
  } 

  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6" style={{padding:"3em"}}>

          <h3 > English Dictionary</h3>

          <form className="" onSubmit={handleSubmit} >
              <div className="ui fluid icon input">
                <input type="text" value={search} onChange={updateSearch}   />
                <button type="submit" className="ui violet button"  value="submit">
                    <i className="search link icon"/> Search Dictionary
                </button>
              </div>
          </form>

        </div>
      </div>

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6"  style={{padding:"3em"}}>
          { word === '' ? (
          <div>
            <h1>Improve your Vocabulary</h1>
            <h1 className="header-big">Search... Save...  Master</h1>
          </div> 
          ):
          <> 
            <span><h4> { word }</h4></span> 
            <span className="align-middle" style={{float:"right"}} >
              <button className="ui violet button" value="save" onClick={saveWord}>
                  <i className="save icon" />&nbsp; Save to List
              </button>
            </span>
            <p> {meaning} </p>
          </> 
          }
        </div>
      </div>

      <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6" style={{padding:"3em"}}> 
          { example == ''  ? '' : 
            (<>
              <h4>Example</h4>
             <p> {example} </p>
            </>)
          }
          </div>
      </div>

      <div className="row">
        <div className="col-md-3"> </div>
        <div className="col-md-6" style={{padding:"3em"}}> 
        { synonyms == ''  ? '' : <h3>Synonyms</h3>}
          {  synonyms.map(synonym =>(
            <span key={synonyms.id}>
              <strong>
              { `${ synonym } , ` }
              { console.log('type of ', typeof(synonym) )}
              {/* `${synonym.synonym[0].toUpperCase() + synonym.synonym.substring(1)} ,`*/}
              </strong>
            </span>  
          ))
          }
        </div>
      </div>

    </>
    )
}
export default Search;