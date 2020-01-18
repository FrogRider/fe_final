import React, { useState, useEffect } from 'react';
import Service from '../serviceFuncs/index';
import EmptyOrder from './emptyOrder';
import CloseBtn from './closeBtn';
import OrderInner from './orderInner';
import './order.scss';

let Order = () => {
  const [visible, setVisible] = useState(true); //state of order window
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')));
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem('order')));
    setTotalPrice(getTotalPrice())
  }, [visible]);

  const getTotalPrice = () => {
    let total = 0;
    let localOrder = JSON.parse(localStorage.getItem('order'))
    localOrder.forEach(e => {
      if(e['p'] !== undefined) total += e['p'] * e['q']
    })
    return total
  }

  const delItem = name => {
    Service.removeFromOrder(name); 
    setOrder(Service.getOrder())
    setTotalPrice(getTotalPrice())
  }

  return (
    <div>
      <div tabIndex="0" className={`popup ${visible === true ? 'unvis' : ''}`}>
        <CloseBtn
          close={() => {setVisible(true)}}
        />
        <div className="orderContent">
          {order.length > 1 ? 
            <OrderInner order={order} delItem={delItem} />
           : 
            <EmptyOrder />
          }
        </div>
        <p className="price">
          {totalPrice !== 0 ? `Total: ${totalPrice}` : ''}
        </p>

        <button
          onClick={() => {
            Service.clearOrder();
            setVisible(true);
          }}
          disabled={order.length === 1}
        >
          Clear order
        </button>
      </div>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className={`orderCircle ${visible === false ? 'bigCircle' : ''}`}
      ></div>
    </div>
  );
};

export default Order;
