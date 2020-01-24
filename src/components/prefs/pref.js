import React from 'react'

const Pref = props => {

  const name = props.name.toLowerCase();
  return (
    <div onClick={()=>{props.change()}} className='singlePref'>
      {`Allow ${name}`}
        <input 
          id={props.name} 
          type="checkbox" 
          checked={!props.active} 
          onChange={props.change}
          className='toggler'
        />

        <label htmlFor={props.name} className='settingsToggler'/>
    </div>
  );
};

export default Pref