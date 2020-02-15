import React, { Component } from 'react';
import './App.scss';
import RouterNav from './components/routerNav';
// import firebase from './firebase.js'

class App extends Component {

  componentDidMount() {
    // const data = firebase.database().ref('data');
    // data.on('value', (snapshot) => {
    //   console.log(snapshot.val())
    // })
  }

  render () {
    return (
      <RouterNav />  
    );
  }
}

export default App;
