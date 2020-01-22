import React, { useState, useEffect } from 'react';
import Service from '../serviceFuncs/index';
import EmptyOrder from './emptyOrder';
import CloseBtn from './closeBtn';
import OrderInner from './orderInner';
import OrderCaution from './cautions/orderCaution';
import './order.scss';
import './cautions/orderCaution.scss';

const Order = () => {
  const [visible, setVisible] = useState(true); //state of order window
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')));
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderCautionVis, setOrderCautionVis] = useState(false)
  const [orderSuccessVis, setOrderSuccessVis] = useState(false)

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem('order')));
    setTotalPrice(getTotalPrice())
  }, [visible]);

  const getTotalPrice = () => {
    let total = 0;
    let localOrder = JSON.parse(localStorage.getItem('order'))
    if(!!order) {

    }
    return total
  }

  const delItem = name => {
    Service.removeFromOrder(name); 
    setOrder(Service.getOrder())
    setTotalPrice(getTotalPrice())
  }

  const resetOrder = () => {
      setTotalPrice(0);
      Service.clearOrder();
      setOrder(Service.getOrder());
  }

  const confirmOrder = () => {
    if(!!order && order.length > 1) {
      let orderDay = order.find(i => i['day'])['day']
    if(Service.getWeekDay() === orderDay) {
      //do something with order
      console.log(order)
      setOrderSuccessVis(true);
      resetOrder()
    }
    else {
      setOrderCautionVis(true);
      resetOrder();
    }
    }
  }

  return (
    
    <div>
      {/* {alert( typeof order)} */}
      <OrderCaution 
        label={'Order wasn\'t made today'} 
        visible={orderCautionVis} 
        changer={()=>{setOrderCautionVis(false)}} 
        type='warn'
      />
      <OrderCaution 
        label={'Success'} 
        visible={orderSuccessVis} 
        changer={()=>{setOrderSuccessVis(false)}} 
        type='correct'
      />
      <div tabIndex="0" className={`popup ${visible === true ? 'unvis' : ''}`}>
        <CloseBtn
          close={() => {setVisible(true)}}
        />
        <div className="orderContent">
          {!!order && order.length > 1 ? 
            <OrderInner order={order} delItem={delItem} />
           : 
            <EmptyOrder />
          }
        </div>
        <p className="price">
          {totalPrice !== 0 ? `Total: ${totalPrice}` : ''}
        </p>

        <button disabled={!!order && order.length === 1} onClick={()=>{confirmOrder()}}>
          confirm order
        </button>
        
        <button
          onClick={() => {
            Service.clearOrder();
            setVisible(true);
          }}
          disabled={!!order && order.length === 1}
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
