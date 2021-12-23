/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 */

import React, { Component } from 'react';

//Forbidden - Displays a message letting the user know that they can't access the requested page.

export default class Forbidden extends Component {
  render() {
    return (
      <main>
      <div className="wrap">
          <h2>Forbidden</h2>
          <p>Oh oh! You can't access this page.</p>
      </div>
  </main>
    );
  }
};

