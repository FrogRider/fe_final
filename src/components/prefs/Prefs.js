import React from 'react';
import importedState from '../state/someState';
import './prefs.scss';
import Service from '../serviceFuncs'
import Kitchens from './Kitchens';
import Pref from './pref'
let settings = importedState['prefs']

class Prefs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kitchens: Service.getLoacalSettings()['kitchens'] || [],
      localSettings: Service.getLoacalSettings()
    };
  }

  componentDidMount() {
    //load data from localStore on reload
    this.setState({ localSettings: Service.getLoacalSettings() });
  }


  change = type => {
    Service.changeSettingByType(type)
    // this.setState({'kitchens':Service.getLoacalSettings()['kitchens']})
    this.setState({ localSettings: Service.getLoacalSettings() });
  };

  render() {
    return (
      <div className="prefs block">
        <div className="settings">
        {Object.entries(settings).map(e => {
          if (['vegan', 'diet', 'gluten_free'].indexOf(e[0]) !== -1) {
            return (
              <Pref 
                key={e[0]}
                active={this.state['localSettings'][e[0]]}
                change={()=>{this.change(e[0])}}
                name={e[0].indexOf('_') === -1 ? 'non '+e[0] : 'gluten-containing'}
              />
            );
          }
          return false;
        })}
        </div>
        <hr />
        <p>Kitchens:</p>
        <Kitchens />
      </div>
    );
  }
};

export default Prefs;