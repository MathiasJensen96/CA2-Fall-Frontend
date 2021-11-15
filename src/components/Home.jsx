import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';

export default function Home({ facade, setLoggedIn, setErrorMessage, logout, loggedIn }) {
    const initialState = {username : "", password : ""}
    const [login, setLogin] = useState(initialState);

const changeName = (event) => {
    //console.log([event.target.name])
    setLogin({
        ...login, [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(login);
   
    facade.login(login.username, login.password, setLoggedIn, setErrorMessage)
    console.log(setErrorMessage);
    
    setLogin(initialState)
  }

  // window.onload=function(){
  //   document.getElementById("addUser-btn").addEventListener('click', e => {
  //     addUser()
  //   })
  // }

  // function addUser() {

  //   const userObject = {
  //       userName: document.getElementById("newUserName").value,
  //       userPass: document.getElementById("newUserPass").value
  //   }
  //   console.log(userObject);
  
    
  //   const options = facade.makeOptions('POST', userObject)
  
  //   fetch(`http://localhost:8080/CA2_Fall_Backend/api/info`, options)
  //   .then(handleHttpErrors)
  //   .then(data => {
  //     setLogin(initialState)
  //   })
  //   .catch(errorHandling)
  // }

    return (
        <div class="text-center">
          <h2>Home</h2>
          <form onSubmit={handleSubmit}>
            <label>
              User Name:
              <br/>
              <input type="text" name="username" value={login.username} onChange={changeName}/>
              <br/>
              Password:
              <br/>
              <input type="text" name="password" value={login.password} onChange={changeName}/>
            </label>
            <br/>
            <button type="submit" class="btn btn-primary">Login</button>
            {facade.hasUserAccess('user', loggedIn) &&
            <button class="btn btn-primary" onClick={logout}>Logout</button>}
            {facade.hasUserAccess('admin', loggedIn) &&
            <button class="btn btn-primary" onClick={logout}>Logout</button>}
            <p>Role: {facade.getUserRoles()}</p>
          </form>
        </div>
      );
}


//Helper functions

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function errorHandling(err) {
  if (err.status) {
    err.fullError.then(e => console.log(e.message))
  }
  else {
    console.log("Network error")
  }
}