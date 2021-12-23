/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 */

 import React, { Component } from 'react';

// Display a message letting the user know that an unexpected error has occurred.
export default class UnhandledError extends Component {
  render() {
    return (
      <main>
        <div className="wrap">
          <h2>Error</h2>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
  </main>
    );
  }
};


