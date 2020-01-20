import React from 'react';
// import state from '../../state/someState';
import Service from '../../serviceFuncs';
import Spec from './dishSpecs'

let Dish = props => {

  let [name, price, calories, pic, type, vegan, diet, gluten_free] = [...props.settings]

  const add = () => {
    Service.addToOrder(name, 1, price)
  }

  return(
    
    <div className="dish card">
      <p>{type.toUpperCase()}</p>
      <img src={'/img/' + pic} alt={name + ' pic'}/>
      <Spec specs={[vegan, diet, gluten_free]} />
      <p>{name}</p>
      <p>Price: {price}</p>
      <p>Calories: {calories}</p>
      <button onClick={()=> {add()}}>Add</button>
      <br/>
    </div>
  )
}

export default Dish;