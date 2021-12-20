import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './styles/global.css';
import './styles/reset.css';

import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';


//This connects the UserSignUp component to context. UserSignUp is now a consuming component that's subscribed to all context changes.
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
// Connect the Header component to context
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);

// <Route path="/signin" component={UserSignInWithContext} />
//The UserSignIn component now has access to the signIn function, as well as any data or actions passed to <Context.Provider value={value}>

export default () => (
  <Router>
    <div>
    <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Public} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext}  />
        <Route path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
