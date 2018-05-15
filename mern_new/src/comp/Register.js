import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email:'',
      password: '',
      confpass:'',
      message:''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username,email, password,confpass } = this.state;
    if(this.state.password!==confpass){
      this.setState({ message: 'Password Not Match' });
    }else{
      axios.post('http://localhost:3002/api/auth/register', { username,email, password })
      .then((result) => {
        this.setState({ message: '' });
        this.props.history.push("/login")
      })
      .catch((err)=>{
        if(err.response.status === 400) {
          this.setState({ message: 'Username Already Exists' });
        }
      });
    }
  }

  render() {
    const { username,email, password,confpass,message } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
        {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <h2 class="form-signin-heading">Register</h2>
          <div class="form-group">
            <label for="inputEmail">Username</label>
            <input type="text" class="form-control" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          </div>
          <div class="form-group">
            <label for="inputConfPass">Confirm Password</label>
            <input type="password" class="form-control" placeholder="Confirm Password" name="confpass" value={confpass} onChange={this.onChange} required/>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;