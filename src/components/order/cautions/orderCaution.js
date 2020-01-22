import React from 'react';
import './orderCaution.scss';

const OrderCaution = props => {
  const type = () => {
    switch (props.type) {
      case 'correct':
        return 'correct.svg'
      case 'warn': 
        return 'warn.svg'
    }
  }
  
  return (
    <div className={`${!props.visible ? 'hide': ''} orderCaution`}>
      <img src={`/img/${ type() }`} alt={props.type}/>
      <p>{props.label}</p>
      <button onClick={()=>{props.changer()}}>Ok</button>
    </div>
  );
};

export default OrderCaution;
