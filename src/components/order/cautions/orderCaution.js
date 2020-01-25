import React from 'react';
import './css/orderCaution.scss'; 

const OrderCaution = props => {
  const type = () => {
    if(props.type === 'correct') return 'correct.svg';
    if(props.type === 'warn') return 'warn.svg';
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
