import React from 'react';
import Service from '../serviceFuncs'

const OrderInner = props => {
  let orderDay = props.order.find(i => i['day'])['day'];
  const orderContent = props.order.map(i => {
    let disabled = Service.getWeekDay() !== orderDay;
    if (i['name'] !== undefined) {
      return (
        <p key={i['name']} className={`${disabled ? 'disabledItem' : ''} orderItem`}>
          {`${i['name']}: ${i['q']}`}
          <i onClick = {()=>{props.delItem(i['name'])}}>
            <img src="./img/bin.svg" alt="x"/>
          </i>
        </p>
      );
    }
    return false
  });

  return orderContent;
}

export default OrderInner
