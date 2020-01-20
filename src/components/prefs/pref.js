import React from 'react'

const Pref = props => {
  return (
    <div className='singlePref'>
      {`Only ${props.name.toLowerCase()}`}
        {/* <input
          checked={props.active}
          onChange={props.change}
          type="checkbox"
        /> */}
        <input id={`enable${props.name}`} type="radio" checked={props.active} onChange={props.change}/>
        <input id={`disable${props.name}`} type="radio" checked={!props.active} onChange={props.change}/>

        <div className='enableTitle' >enabled</div>
        <div className='disableTitle' >disabled</div>

        <label className='enableL' htmlFor={`enable${props.name}`}></label>
        <label className='disableL' htmlFor={`disable${props.name}`}></label>
    </div>
  );
};

export default Pref