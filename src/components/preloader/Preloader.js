import React, { Component } from 'react';
import './preloader.scss';

export default class Preloader extends Component{
  constructor(props){
      super(props);
      this.viewRef = React.createRef();
  }
  render(){
      return(
          <div ref={this.viewRef} className="preloader">
              <p>LOADING</p>
          </div>
      );
  }
  componentWillUnmount(){
     this.viewRef.current.style.opacity = 0;
  }
}