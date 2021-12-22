import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

/**
 * In React, Context is primarily used when some data needs to be accessible by many components 
 * at different nesting levels. Context lets you pass data through the component tree without 
 * having to pass props down manually at every level.
 */

const Context = React.createContext(); 

//the Provider is what provides the data that needs to be consumed by other components of the application.
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { // Add the 'actions' property and object
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    
    return (
      //value represents an object containing the context to be shared throughout the component tree.
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //The returned PromiseValue will be an object holding the authenticated user's name and username values
  signIn = async (emailAddress, password) => {
    console.log("password!!!!!!!!!!")
    console.log(password)
    const user = await this.data.getUser(emailAddress, password);

    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      // Set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      //The value 1 creates a cookie that expires 1 day from now.
    }
    return user;
  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
//withContext automatically subscribes (or connects) the component passed to it to all actions and context changes:


export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

