import React, {useState} from 'react';
import Service from '../serviceFuncs'

const Kitchens = () => {

  const [kitchens, setKitchens] = useState(Service.getLoacalSettings()['kitchens'])
  let elems = [
    ['it', 'Italian'],['fr', 'French'],['ua', 'Ukrainian'],['ru', 'Russian'],['chn', 'Chinese'], ['usa', 'American']
  ].map(e => {
    return (
      <label htmlFor={e[1]} key={e[1]} className='singlePref'>
        {e[1]}
          <input
            type="checkbox"
            onChange={() => {
              Service.switchKitchen(e[0]);
              setKitchens(Service.getLoacalSettings()['kitchens'])
            }}
            checked={kitchens.indexOf(e[0]) === -1}
            className='toggler'
            id={e[1]}
          />
          <label htmlFor={e[1]} className='settingsToggler' />
      </label>
    );
    
  });

  return(
    <div className="settings">
      {elems}
    </div>
  )
}

export default Kitchens