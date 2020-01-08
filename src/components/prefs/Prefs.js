import React from 'react';
import importedState from '../state/someState';
import './prefs.scss';
import Service from '../serviceFuncs'
let settings = importedState['prefs']


class Prefs extends React.Component  {
  state = {key: 'value'}

  componentDidMount(){ //load data from localStore on reload
    Service.backupSettings(this.props.dispatch)
    this.setState({key: 'value'})
  }

  change = type => {
    this.props.dispatch({ type: 'changePref', payload: type });
    this.setState({key: 'value'})
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  render() {
    return (
      <div className="prefs block">
        {Object.entries(settings).map(e => {
          let label = e[0].charAt(0).toUpperCase() + e[0].slice(1).replace('_', ' ');
          if (e[0] === 'vegan' || 
              e[0] === 'diet'  || 
              e[0] === 'gluten_free') {
            return (
              <p key={e[0]}>
                <label>
                  <input
                    checked={settings[e[0]]}
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

        {
          //TODO:
          //pagination setting
          //reset button
        }
      </div>
    );
  }
};

export default Prefs;