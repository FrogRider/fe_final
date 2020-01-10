import React from 'react';
import './menues.scss';
import CreateMenu from './subComponents/CreateMenu'

const Menues = props => {
  return (
    <div className="menues block">
      <CreateMenu dispatch={props.dispatch}/>
      Menues!
    </div>
  );
};

export default Menues;