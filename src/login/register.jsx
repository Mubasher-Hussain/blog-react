import React from "react";

import axios from "../auth/axiosConfig";
import loginImg from "../login.svg";

const ValidEmailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


export class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        email: '',
        password: '',
        password2: '',
      },
      error: {
        name: 'Please Enter Name',
        email: 'Enter email',
        pass: 'Enter pass',
        conpass: 'enter confirm pass',
      },
      isFormValid: false,
    };
  }

  // Updates state.error if any in form fields
  handleInputChange(event) {
 
    let formData = this.state.formData;
    const {name, value} = event.target
    let error = this.state.error;
    formData[name] = value;
    switch(name){
      case 'username':
        error.name = value.length < 3
                ? 'Name should have at least 3 characters'
                : '';
        break;

      case 'email':
        error.email = !ValidEmailRegex.test(value)
                ? 'Invalid Email'
                : '';
        break;

      case 'password':
        error.pass = value.length < 7
                ? 'Password should have at least 7 characters'
                : '';
        break;

        case 'password2':
          error.conpass = value === formData.password
                  ? ''
                  : 'Confirm password does not match password';
          break;  
    }

    this.setState({
      formData: formData,
      error: error,
      isFormValid: !(error.name || error.email || error.pass || error.conpass)
    });
  }

  // Sends data to be registered
  registerForm() {
    if(!this.state.isFormValid){
      let errors=this.state.error;
      var errorValues = Object.keys(errors).map(function(key){
        return errors[key];
       });
      alert (errorValues.join('\n'));
      return null;
    }
    let formData = this.state.formData;
    delete(formData['password2']);
    axios
    .post('blogs/api/register/', formData)
    .then(res => {
      if (res.data.error){
        alert(res.data.error);
      }
      else{
        alert(res.data.success)
        window.location.reload(true);
      }

    })
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
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
              <label htmlFor="email">Email</label>
              <input type="text"
               name="email"
               placeholder="email"
               value={this.state.formData.email}
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
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password"
               name="password2"
               placeholder="Confirm Password"
               value={this.state.formData.password2}
               onChange={this.handleInputChange.bind(this)}
               />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.registerForm.bind(this)}>
            Register
          </button>
        </div>
      </div>
    );
  }
}
