import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';

export default class UpdateCourse extends Component {
  // render() {
  //   return (
  //     <main>
  //     <div className="wrap">
  //         <h2>Update Course</h2>
  //         <p>update course page.</p>
  //     </div>
  // </main>
  //   );
  // }
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId:'',
    errors: [],
  }

  
  componentDidMount() {
    console.log("updating!!")
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const currentUserId = authUser.userId;

    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => {
        console.log("update course; getting data")
        console.log(response.data.course.user.id)
        console.log(currentUserId)
        if(currentUserId !== response.data.course.user.id){
          this.props.history.push('/forbidden');    
        }else{
          console.log("authorized access")
          this.setState({
            title: response.data.course.title,
            description: response.data.course.description,
            userId: response.data.course.user.id
          });
          //console.log('Done fetching!')
          if(response.data.course.materialsNeeded){
            console.log("update material")
            console.log(response.data.course.materialsNeeded)
            this.setState({
              materials: response.data.course.materialsNeeded
            });
            console.log(this.state.materials)
          }
  
          if(response.data.course.estimatedTime){
            console.log("update estimatedTime")
            this.setState({
              estimatedTime: response.data.course.estimatedTime
            });
          }
          
        }

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    console.log(`updating!!!!`)
    console.log(this.state.materials)
    const { context } = this.props;
    const authUser2 = context.authenticatedUser;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
    
    console.log(`material before return`)
    console.log(this.state.materials)
    
    
    return (
      <div className="wrap">
          <h2>Update Course</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
              <div className="main--flex">
                <div>
                <label> Course Title
                  <input 
                    id="title" 
                    name="title" 
                    type="text"
                    value={title} 
                    onChange={this.change} 
                    placeholder="Course Title"/>
                </label>
                <label> Course Description
                  <textarea 
                    id="description" 
                    name="description" 
                    type="text"
                    value={description} 
                    onChange={this.change} 
                    placeholder="Course Description" />
                </label>
                </div>
                <div>
                <label> Estimated Time
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="text"
                    value={estimatedTime} 
                    onChange={this.change} 
                    placeholder="Estimated Time" />
                </label>
                <label> Materials Needed
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    type="text"
                    value={this.state.materialsNeeded} 
                    onChange={this.change} 
                    placeholder="Materials Needed" />
                </label>
                </div>
              </div>
              </React.Fragment>
            )} />
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
    const authUser = context.authenticatedUser;
    //console.log(`user logging: ${authUser}`)
    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state; 

    const userId = authUser.userId;
    //console.log(`user logging: ${userId}`)
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    //createcourse() is an asynchronous operation that returns a promise. 
    //The resolved value of the promise is either an array of errors (sent from the API if the response is 400), 
    //or an empty array (if the response is 201).
    const courseID = this.props.match.params.id
    context.data.updateCourse(courseID, course,authUser.emailAddress, authUser.password).then(errors => {
      if (errors.length) {
        console.log("errors found")
        this.setState({ errors });
      }else {
        console.log(`${title} is successfully signed up and authenticated!`);
        this.props.history.push('/');    
    }
  }).catch( err => { // handle rejected promises
      console.log("update errors found")
      console.log(err);
      this.props.history.push('/error'); // push to history stack
      //change the current URL from /signup to /error when there is an error
    });  
    //check if the returned PromiseValue is an array of errors.
  }

  
  //If a course decides to cancel registration, we will redirect them back to the home route
  cancel = () => {
    this.props.history.push('/');
  }
}
