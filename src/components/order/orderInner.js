import React from 'react';
import Service from '../serviceFuncs'

const OrderInner = props => {
  //if day === 0, undefined returns, so || added to fix that
  let orderDay = props.order.find(i => i['day']) || {day:0};
  const orderContent = props.order.map(i => {
    let disabled = Service.getWeekDay() !== orderDay.day;
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
