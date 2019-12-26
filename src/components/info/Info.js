import React from 'react';
import './info.scss';



const Info = (props) => {
  return (
    <div className="info block">
      {/* <p onClick={() => {props.dispatch({ type: 'getState' })}}>Info!</p> */}
      <p onClick={() => {props.dispatch({ type: 'fill' })}}>Fill!</p>
      <p onClick={() => {props.dispatch({ type: 'say' })}}>Say!</p>
      <p onClick={() => {props.dispatch({ type: 'errase' })}}>Clean!</p>
    </div>
  );
};

export default Info;