import React, { useState, useEffect } from 'react';
import Service from '../serviceFuncs/index';
import './order.scss';

let Order = () => {
  const [visible, setVisible] = useState(true);
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')));

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem('order')));
  }, [visible]);

  const orderContent = order.map(i => {
    if (i['name'] !== undefined) {
      return (
        <p key={i['name']} className="orderItem">{`${i['name']}: ${i['q']}`}</p>
      );
    }
  });

  const empty = (
    <div className="emptyBasket">
      <p>There is nothing in here quiet yet...</p>
      <p>Try adding some items to your basket</p>
    </div>
  );

  const close = (
    <i
      className="close"
      onClick={() => {
        setVisible(true);
      }}
    ></i>
  );

  return (
    <div className="">
      <div className={`popup ${visible == true ? 'unvis' : 0}`}>
        {close}
        {order.length > 1 ? orderContent : empty}
        <button
          onClick={(e, data) => {
            console.log(e.target.value);
            Service.clearOrder();
            setVisible(true);
          }}
          disabled={order.length === 1 ? true : false}
        >
          Clear order
        </button>
      </div>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className={`orderCircle ${visible == false ? 'bigCircle' : 0}`}
      ></div>
    </div>
  );
};

export default Order;
