import React, {useState} from 'react';
import Service from '../serviceFuncs'

const Kitchens = () => {

  const [kitchens, setKitchens] = useState(Service.getLoacalSettings()['kitchens'])
  let elems = [
    ['it', 'Italy'],['fr', 'France'],['ua', 'Ukraine'],['ru', 'Russia'],['chn', 'China'], ['usa', 'America']
  ].map(e => {
    return (
      <p key={e[1]}>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              Service.switchKitchen(e[0]);
              setKitchens(Service.getLoacalSettings()['kitchens'])
            }}
            checked={kitchens.indexOf(e[0]) == -1}
          />
          {e[1]}
        </label>
      </p>
    );
    
  });

  return(
    <div className="">
      {elems}
    </div>
  )
}

export default Kitchens