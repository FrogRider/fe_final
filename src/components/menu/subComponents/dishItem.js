import React from 'react'

let Dish = props => {
  let {name, price, calories, pic, id, dispatch} = props
  return(
    <div className="dish card">
      <a href="/contacts"><img src={'./img/' + pic} alt={name + ' pic'}/></a>
      <p>{name}</p>
      <p>Price: {price}</p>
      <p>Calories: {calories}</p>
      <button onClick={()=> {dispatch({ type: 'test', payload: id })}}>Add</button>
      <hr/>
      <br/>
    </div>
  )
}

export default Dish;