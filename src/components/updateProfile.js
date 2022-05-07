import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";

import userService from "../services/user.service";
import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function Register(props){

    const form = useRef();
    const checkBtn = useRef();
     const [data, setData] = React.useState([]);
    const [id, setId] = useState(data.id);
    const [email, setEmail] = useState(data.email);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [accessToken, setaccessToken] = useState("");

    React.useEffect(() => {
    
            if(typeof(props.USER) != "undefined"){
               
                setEmail(props.USER.email);
                setId(props.USER.id);
                setfirstName(props.USER.firstName);
                setlastName(props.USER.lastName);
                setaccessToken(props.USER.accessToken);
            }
            
    }, []);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        console.log(email);
    };

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setfirstName(firstName);
        console.log(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setlastName(lastName);
        console.log(lastName);
    };

    const onChangeAccessToken = (e) => {
        const accessToken = e.target.value;
        setaccessToken(accessToken);
        console.log(accessToken);
    };

    let history = useHistory();

    function handleClick() {
      history.push("/home");
    }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      userService.update(id ,email, firstName, lastName, accessToken).then(
        (response) => {
            
            handleClick();
            window.location.reload();
            setMessage(response.data.message);
            setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
       

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
             
              <div className="form-group">
                <label htmlFor="firstName">firstName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">lastName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                   value={lastName}
                  onChange={onChangeLastName}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="accessToken">accessToken</label>
                <Input
                  type="text"
                  className="form-control"
                  name="accessToken"
                  value={accessToken}
                  onChange={onChangeAccessToken}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

             
              <div className="form-group">
                <button className="btn btn-primary btn-block">Update</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};


