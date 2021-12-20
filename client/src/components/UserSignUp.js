import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name"/>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
  
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state; 

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    //createUser() is an asynchronous operation that returns a promise. 
    //The resolved value of the promise is either an array of errors (sent from the API if the response is 400), 
    //or an empty array (if the response is 201).
    context.data.createUser(user).then(errors => {
      if (errors.length) {
        this.setState({ errors });
      }else {
        console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
        context.actions.signIn(emailAddress, password).then(() => {
          this.props.history.push('/');    
        });
    }
  }).catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error'); // push to history stack
      //change the current URL from /signup to /error when there is an error
    });  
    //check if the returned PromiseValue is an array of errors.
  }

  
  //If a user decides to cancel registration, we will redirect them back to the home route
  cancel = () => {
    this.props.history.push('/');
  }
}
