/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 */

import React from 'react';
import { Link } from 'react-router-dom';

//stateless component: Displays the top menu bar for the application and includes buttons for 
//signing in and signing up (if there's not an authenticated user) or the user's name and a button 
//for signing out (if there's an authenticated user).

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
            </h1>
          <nav>
            {authUser ?
              <React.Fragment>
                <ul className="header--signedin">
                  <span>Welcome, {authUser.firstName} {authUser.lastName} !</span>
                  <li><Link to="/signout">Sign Out</Link></li>
                </ul>
              </React.Fragment>
            :    
            <React.Fragment>
              <ul className="header--signedout">
                <li><Link className="signup" to="/signup">Sign Up</Link></li>
                <li><Link className="signin" to="/signin">Sign In</Link></li>
              </ul>
            </React.Fragment>
          }
          </nav>
      </div>
    </header>
    );
  }
};

