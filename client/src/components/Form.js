/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 */

import React from 'react';


//this component: renders any validation errors sent from the API, 
//via the <ErrorsDisplay> function component. It also renders the "Submit" and 
//"Cancel" buttons of a form, as well as handle their functionality, via the 
//functions handleSubmit and handleCancel. Props are passed to this component – 
//from a parent component like UserSignUp – to provide it the data it needs.

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
      </div>
    );
  }

  return errorsDisplay;
}
