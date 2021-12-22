

/**
 * code reference: course material React Authentication/Set up the React App
 */

 import config from './config';
 //api(), is used to make the GET and POST requests to the REST API. 
 //"It currently accepts an API endpoint as its first argument (path), 
 //followed by the HTTP method, and body, which will contain any data associated with the request."
 
 export default class Data {
   api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
     //regarding requiresAuth & credentials: nitialize the parameters with default values in case no values or 
     //undefined gets passed for either. In the api() method's body, we'll check if an endpoint (or route) 
     //requires user authentication.
     
     const url = config.apiBaseUrl + path;
   
     const options = {
       method,
       headers: {
         'Content-Type': 'application/json; charset=utf-8',
       },
     };
 
     if (body !== null) {
       options.body = JSON.stringify(body);
     }
 
     //checks if requiresAuth is truthy (or considered true)
     if (requiresAuth) {    
       const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
       //The btoa() method creates a base-64 encoded ASCII string from a "string" of data. 
       //btoa() will encode the username and password credentials passed to the api() method. 
       //The credentials will be passed as an object containing username and password properties.
       options.headers['Authorization'] = `Basic ${encodedCredentials}`;
     }
 
     return fetch(url, options);
   }
 
   async getUser(emailAddress, password) { // add new parameters
    console.log("password logging")
     const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password })
     if (response.status === 200) {
       return response.json().then(data => data);
     }
     else if (response.status === 401) {
       return null;
     }
     else {
       throw new Error();
     }
   }
   
   async createUser(user) {
     const response = await this.api('/users', 'POST', user);
     if (response.status === 201) {
       return [];
     }
     else if (response.status === 400) {
       return response.json().then(data => {
         return data.errors;
       });
     }
     else {
       throw new Error();
     }
   }

   //because creating a course needs credentials, we need to set requiresAuth to be true and send in credentials info
   //api(path, method = 'GET', body = null, requiresAuth = false, credentials = null)
   async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

   async getCourse(courseID) { // add new parameters
    const response = await this.api(`/courses/${courseID}`, 'GET', null)
    if (response.status === 200) {
      return response.json().then(data => data.course);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(courseID, course, emailAddress, password) {
    const response = await this.api(`/courses/${courseID}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(courseID, emailAddress, password) {
    const response = await this.api(`/courses/${courseID}`, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  
 }
 