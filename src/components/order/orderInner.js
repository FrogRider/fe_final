import React from 'react';
import Service from '../serviceFuncs'

const OrderInner = props => {
  if(!!props.order) {
    const orderContent = props.order.map(i => {
      let disabled;
      if(i['a']) disabled = i['a'].indexOf(Service.getWeekDay()) === -1
       
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
    })
  
    return orderContent;
  }
}

export default OrderInner
