import React from 'react';
import './css/dishSpecs.scss'

const Spec = props => {

  const [vegan, diet, gluten_free] = [...props.specs]

  return <div className="specs">
    <p 
    title={diet ? 'product is diet' : 'product isn\'t diet'} 
    className={`spec diet ${!diet ? 'disabled' : ''}`}>
      diet
    </p>
    <p 
    title={vegan ? 'product is vegan' : 'product isn\'t vegan'} 
    className={`spec vegan ${!vegan ? 'disabled' : ''}`}>
      vegan
    </p>
    <p 
    title={gluten_free ? 'product is gluten-free' : 'product isn\'t gluten-free'} 
    className={`spec gluten_free ${!gluten_free ? 'disabled' : ''}`}>
      gluten-free
    </p>
  </div>
}

export default Spec