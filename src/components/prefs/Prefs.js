import React from 'react';
import importedState from '../state/someState';
import './prefs.scss';
import Service from '../serviceFuncs'
import Kitchens from './Kitchens';
let settings = importedState['prefs']


class Prefs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'value',
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
        {Object.entries(settings).map(e => {
          let label =
            e[0].charAt(0).toUpperCase() + e[0].slice(1).replace('_', ' ');
          if (['vegan', 'diet', 'gluten_free'].indexOf(e[0]) !== -1) {
            return (
              <p key={e[0]}>
                <label>
                  <input
                    checked={this.state['localSettings'][e[0]]}
                    onChange={() => this.change(e[0])}
                    type="checkbox"
                  />
                  {label}
                </label>
              </p>
            );
          }
          return false;
        })}
        <hr />
        <Kitchens />
      </div>
    );
  }
};

export default Prefs;