import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      courses: []
    };
  } 

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        console.log(response.data)
        this.setState({
          courses: response.data
        });
        //console.log('Done fetching!')
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() { 
    console.log("before logging");
    var list = []
    list = this.state.courses
    console.log(list);
    var titles= list.map(course => course.title)
    console.log(titles)
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm />      
          </div>   
        </div>    
        <div className="main-content">
          <GifList data={this.state.courses} />
        </div>
      </div>
    );
  }
}
