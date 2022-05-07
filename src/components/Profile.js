import React, {useEffect, useState} from "react";
//import { Button } from "bootstrap";
import userService from "../services/user.service";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";




const Profile = (props) => {
  const [data, setData] = React.useState([]);

  let history = useHistory();

  function handleClick() {
    history.push("/login");
  }

  function onDelete(){
    userService.Delete().then(
      () => {
        props.deluser(undefined);
        AuthService.logout();
        handleClick();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
       
      }
    );
  }

  React.useEffect(() => {
    userService.getPublicContent().then(res => {
      setData(res.data);
    });
  }, []);




  
  return  (
    <div className="container" style={{fontSize: 30}}>
      <header className="jumbotron" >
        <h3>
          <strong style={{fontSize: 50}}>Profile </strong> 
        </h3>
      </header>

      <table class="table">
      <tbody>
        <tr>
          <th scope="row"><span class="material-icons  md-36" style={{fontSize:55, marginTop:4}}>account_circle</span></th>
          <td>Name :</td>         
          <td>{data.firstName+" "+data.lastName}</td>
        </tr>
        <tr>
          <th scope="row"><span class="material-icons  md-36" style={{fontSize:55, marginTop:4}}>generating_tokens</span></th>
          <td>Token :</td>
          <td>{ data.accessToken ? ( data.accessToken.substring(0,30)) : (data.accessToken) } ...</td>
        </tr>
        <tr>
          <th scope="row"><span class="material-icons  md-36" style={{fontSize:55, marginTop:4}}>mail</span></th>
          <td> Email:</td>
          <td>{data.email}</td>
        </tr>
        <tr>
          <th scope="row"><a href="/updateProfile" class="badge badge-primary btn-lg  mb-5">update</a> </th>
          <td><a href="#" onClick={onDelete} class="badge badge-danger btn-lg ml-5 mb-5">delete</a> </td>
          <td></td>
        </tr>
      </tbody>
    </table>

   
    </div>
  );
};

export default Profile;
