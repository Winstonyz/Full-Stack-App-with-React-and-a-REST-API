/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 * 
 * 
 * If an unauthenticated user is redirected to the sign in page, the UserSignIn 
 * component redirects users back to the previous screen after successfully signing in:
 * 
 * https://www.geeksforgeeks.org/how-to-make-browser-to-go-back-to-previous-page-using-javascript/
 * https://stackoverflow.com/questions/3528324/how-to-get-the-previous-url-in-javascript
 * https://www.w3schools.com/jsref/jsref_includes.asp
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

//This component provides the "Sign In" screen by rendering a form that allows a user to 
//sign in using their existing account information.
export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="User Name" />
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
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
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
    // const { context } = this.props;
    // const { username, password } = this.state;
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    
    //The component also renders a "Sign In" button that when clicked signs in the user and 
    //a "Cancel" button that returns the user to the default route (i.e. the list of courses).
    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        }else {
          //If an unauthenticated user is redirected to the sign in page, the UserSignIn component redirects users 
          //back to the previous screen after successfully signing in.
          //only PrivateRoutes will potentially result in redirecting to the signIn page: /courses/create or
          ///courses/:id/update
          var lastPage = document.referrer
          if(lastPage.includes("update")||lastPage.includes("create")||lastPage.includes("forbidden")){
            window.history.go(-1)
          }else{
            this.props.history.push(from);
          }
          //console.log(`SUCCEsssSS! ${emailAddress} is now signed in! Password is: ${password}`);
       }
      }).catch( err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    this.props.history.push('/');
  }

}
