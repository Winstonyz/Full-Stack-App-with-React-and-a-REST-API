import React, { Component } from 'react';
import axios from 'axios';

export default class CourseDetail extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      user:{},
      materials:[]
    };
  } 



  componentDidMount() {
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => {
        console.log("data")
        console.log(response.data.course.user)
        this.setState({
          course: response.data.course,
          user: response.data.course.user
        });
        //console.log('Done fetching!')
        if(response.data.course.materialsNeeded){
          this.setState({
            materials: response.data.course.materialsNeeded.split("* ")
          });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render(){
    console.log("seeing prop")
    console.log(this.props)
    console.log(this.state.course)
    var courseInfo = this.state.course
    let materials = this.state.materials
    let instructor = this.state.user
    //const myArray = materials.split(" ");
    console.log("material")
    console.log(this.state.materials)
    var count=1
    var materialsList= materials.map(object => {count=count+1; return(
        <li key = {count}>{object}</li>
    )})
    //console.log(myArray)
    return (
      <main>
      <div className="actions--bar">
          <div className="wrap">
              <a className="button" href="update-course.html">Update Course</a>
              <a className="button" href="#">Delete Course</a>
              <a className="button button-secondary" href="/">Return to List</a>
          </div>
      </div>
      
      <div className="wrap">
          <h2>Course Detail</h2>
          <form>
              <div className="main--flex">
                  <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{courseInfo.title}</h4>
                      <p>By {instructor.firstName} {instructor.lastName}</p>
                      <p>{courseInfo.description}</p>

                  </div>
                  <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{courseInfo.estimatedTime}</p>

                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                          {materialsList}
                      </ul>
                  </div>
              </div>
          </form>
      </div>
  </main>
    )
  }

}
