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
      <p className='dishType'>{type.toUpperCase()}</p>
      <div className="imgPlaceHolder">
        <img src={'/img/' + pic} alt={name + ' pic'} title={name}/>
      </div>
      <Spec specs={[vegan, diet, gluten_free]} />
      <p>{name}</p>
      <p>Calories: {calories}</p>
      <p>Price: {price}</p>
      <button onClick={()=> {add()}}>Add</button>
      <br/>
    </div>
  )
}

export default Dish;