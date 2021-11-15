import logo from './logo.svg';
import './App.css';
import "./style2.css";
import Home from './components/Home';
import Bored from "./components/Bored";
import Cat from './components/Cat';
import Dog from './components/Dog';
import Genderize from './components/Genderize';
import facade from './facade';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";


export default function BasicExample() {
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [fact, setFact] = useState("");
  const [message, setMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('All is good ... so far');

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage('Logged out.')
  };
  

  useEffect( () => {
      fetch("https://www.boredapi.com/api/activity")
      .then(res => res.json())
      .then(data => (setActivity(data.activity), setType(data.type)))
  },[])

  useEffect( () => {
    fetch("https://catfact.ninja/fact")
    .then(res => res.json())
    .then(data => setFact(data.fact))
},[])

useEffect( () => {
  fetch("https://dog.ceo/api/breeds/image/random")
  .then(res => res.json())
  .then(data => setMessage(data.message))
},[])


  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/bored">Bored</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/cat">Cat</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/dog">Dog</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/genderize">Genderize</NavLink>
          </li>
        </ul>

        <hr/>
        
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home 
            logout={logout}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            facade={facade}
            setErrorMessage={setErrorMessage}
            />
          </Route>
          <Route path="/bored">
              {facade.hasUserAccess('user', loggedIn) && 
              <Bored facade={facade} setErrorMessage={setErrorMessage} activity={activity} type={type}/>}
          </Route>
          <Route path="/cat">
            <Cat fact={fact}/>
          </Route>
          <Route path="/dog">
            <Dog message={message} />
          </Route>
          <Route path="/genderize">
          <Genderize/>
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}