/**
 * code reference: course material React Authentication/Set up the React App
 *                 markup html file
 */

import React, { Component } from 'react';
import axios from 'axios';

//This component provides the "Courses" screen by retrieving the list of courses from the REST 
//API's /api/courses route and rendering a list of courses. 
export default class Courses extends Component {

  constructor() {
    super();
    this.state = {
      courses: []
    };
  } 

  //using axios to fetch data from the api and store all the courses into state
  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        console.log(response.data)
        this.setState({
          courses: response.data.courses
        });
        //console.log('Done fetching!')
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.props.history.push('/error'); 
      });
  }


  render() {
    //console.log("before logging");
    // console.log("last page")
    // var lastPage = document.referrer
    // console.log(lastPage.includes("courses2"))
    var list = []
    list = this.state.courses
    //console.log(list);
    var titles= list.map(course => {return(
      <a className="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </a>
    )
    //<Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
    })
    
    //console.log(titles)
    //console.log(titles)
    return (
      <div className="wrap main--grid">
        {titles}
          <a className="course--module course--add--module" href="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
        
      </div>
    );
  }
}
