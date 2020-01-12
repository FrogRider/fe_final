import React from 'react';
import './info.scss';



const Info = (props) => {
  return (
    <div className="info block">
      {/* <p onClick={() => {props.dispatch({ type: 'getState' })}}>Info!</p> */}
      <p>Info!</p>
    </div>
  );
};

export default Info;