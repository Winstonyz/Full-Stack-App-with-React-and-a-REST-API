/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 */


//the  sign out actions (i.e. methods) are defined using a Context API <Provider> 
//component and made available throughout your application using Context API <Consumer> components.

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
export default ({context}) => {
  // component calls signOut and updates state after render
  useEffect(() =>  context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}