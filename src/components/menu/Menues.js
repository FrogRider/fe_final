import React from 'react';
import './menues.scss';
import Pagination from './subComponents/pagination'

const Menues = props => {
  return (
    <div className="menues block">
      <Pagination dispatch={props.dispatch}/>
      Menues!
    </div>
  );
};

export default Menues;