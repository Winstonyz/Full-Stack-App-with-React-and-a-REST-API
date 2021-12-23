/**
 * code reference: course material React Authentication/Set up the React App
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';



import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
//import Authenticated from './components/Authenticated';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Forbidden from './components/Forbidden';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from './components/UnhandledError';

//This connects the UserSignUp component to context. UserSignUp is now a consuming component that's subscribed to all context changes.
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
// Connect the Header component to context
const HeaderWithContext = withContext(Header);
//const AuthWithContext = withContext(Authenticated);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const ForbiddenWithContext = withContext(Forbidden);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CoursesWithContext = withContext(Courses);
const UnhandledErrorWithContext = withContext(UnhandledError);

// <Route path="/signin" component={UserSignInWithContext} />
//The UserSignIn component now has access to the signIn function, as well as any data or actions passed to <Context.Provider value={value}>

export default () => (
  <Router>
    <div>
    <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext}  />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/forbidden" component={ForbiddenWithContext} />
        <Route path="/error" component={UnhandledErrorWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
