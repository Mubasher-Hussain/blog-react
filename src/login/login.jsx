import React from "react";

import { useHistory } from 'react-router-dom';

import axios from "../auth/axiosConfig";
import loginImg from "../login.svg";
import { login } from "../auth"
    
export class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: '',
      },
    };
  }

  handleInputChange(event) {
    let formData=this.state.formData;
    formData[event.target.name]=event.target.value;
    this.setState({
      formData: formData
    });
  }

  render() {
    return (

      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text"
               name="username"
               placeholder="username"
               value={this.state.formData.username}
               onChange={this.handleInputChange.bind(this)}
               />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
               name="password"
               placeholder="password"
               value={this.state.formData.password}
               onChange={this.handleInputChange.bind(this)}
               />
            </div>
          </div>
        </div>
        <div className="footer">
          <LoginButton formData={this.state.formData} />
        </div>
      </div>
    );
  }
}


function LoginButton(props) {
  const history = useHistory();
  
  function handleClick() {
    let formData = props.formData;
    axios
    .post('blogs/api/login/', formData)
    .then(res => {
      if (res.data.Success){
        login(res);
        alert("Successfully logged in ");
        history.push("../blogsList");
      }
      else{
        alert("Incorrect Username or password")
      }
    })
    
  }

  return (
    <button type="button" className="btn" onClick={handleClick}>
      Login
    </button>
  );
}
