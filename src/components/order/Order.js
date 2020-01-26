import React, { useState, useEffect } from 'react';
import Service from '../serviceFuncs/index';
import EmptyOrder from './emptyOrder';
import CloseBtn from './closeBtn';
import OrderInner from './orderInner';
import OrderCaution from './cautions/orderCaution';
import './css/order.scss';

const Order = () => {
  const [visible, setVisible] = useState(true); //state of order window
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')));
  const [totalPrice, setTotalPrice] = useState(0);

  const [caution, setCaution] = useState({type:'',label:'',visible:false})

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem('order')));
    setTotalPrice(getTotalPrice())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const getTotalPrice = () => {
    let total = 0;
    let localOrder = JSON.parse(localStorage.getItem('order'))
    if(!!order) {
      localOrder.forEach(e => {
        if(e['p'] !== undefined) total += e['p'] * e['q']
      })
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
    if (!!order && order.length > 1) {
      //if day === 0, undefined returns, so || added to fix that
      let orderDay = order.find(i => i['day']) || {day:0};
      // let orderDay = order.find(i => [1,2,3,4,5,6,0].indexOf(i.day) !== -1);
      let oldItems = false;
      order.forEach(i => {
        if(i['name']) {
          if(i['a'].indexOf(Service.getWeekDay()) === -1)
            oldItems = true
        }
      })
      if (Service.getWeekDay() === orderDay.day && !oldItems) {
        //do something with order
        console.log(order);
        callCaution('correct', 'Success');
        resetOrder();
      } else {
        callCaution('warn', "Some of the ordered dishes are not available today");
      }
    }
  };

  const callCaution = (type, label, vis = true) => {
    setCaution({type:type, label:label, visible:vis})
  }

  return (
    
    <div>
      <OrderCaution 
        label={caution['label']} 
        visible={caution['visible']} 
        changer={()=>{callCaution('','',false)}} 
        type={caution['type']}
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
