import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
import commentManager from './services/commit.service';


import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UpdateProfile from "./components/updateProfile"

import EventBus from "./common/EventBus";
import Explore from "./components/Explore";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [DATA , setData] = useState(undefined);

  useEffect(() => {

    UserService.getPublicContent().then(res => {
      setCurrentUser(res.data);
    });

     commentManager.getAllComment().then(res => {
      setData(res.data);
    });

    console.log("data ",DATA);

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Sentimentalysis
        </Link>
        
        <div className="navbar-nav mr-auto">
       
          { currentUser ? (   
              
          <div className="navbar-nav ml-auto">
             <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Analytics 
            </Link>
          </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log in
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
           
          </div>
        )}

        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={() => <Explore DATA={DATA}/>} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={() => <Profile deluser={setCurrentUser}/>} />
          <Route exact path="/updateProfile" component={()=> <UpdateProfile USER={currentUser}/>} />
        </Switch>
      </div>

    </div>
  );

};


export default App;
