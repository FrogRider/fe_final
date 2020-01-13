import React from 'react';
// import state from '../../state/someState';
import Service from '../../serviceFuncs'
// let order = state['order'];

let Dish = props => {

  let [name, price, calories, pic, type] = [...props.settings]

  const add = () => {
    Service.addToOrder(name, 1)
    console.log(localStorage.getItem('order'))
  }

  return(
    
    <div className="dish card">
      <p>{type.toUpperCase()}</p>
      <img src={'/img/' + pic} alt={name + ' pic'}/>
      <p>{name}</p>
      <p>Price: {price}</p>
      <p>Calories: {calories}</p>
      <button onClick={()=> {add()}}>Add</button>
      <br/>
    </div>
  )
}

export default Dish;