import React from 'react'

const OrderInner = props => {
  const orderContent = props.order.map(i => {
   
    if (i['name'] !== undefined) {
      return (
        <p key={i['name']} className="orderItem">
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
