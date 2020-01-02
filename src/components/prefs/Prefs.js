import React from 'react';
import importedState from '../state/someState';
import './prefs.scss';
let settings = importedState['prefs']


class Prefs extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
      vegan: settings['vegan'],
      diet: settings['diet'],
      gluten_free: settings['gluten_free']
    }
  }

  componentDidMount(){ //load data from localStore on reload
    let raw = localStorage.getItem('settings');
    if (raw !== null) {
      let data = JSON.parse(raw);
      for (let key in data) {
        this.props.dispatch({ type: 'setPref', payload: [key, data[key]] });
      }
      for(let i in this.state) this.setState({ [i] : settings[i]})
    }
  }

  change = type => {
    this.props.dispatch({ type: 'changePref', payload: type });
    this.setState({ [type] : !this.state[type]}); //just for re-rendering checkboxes
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  render() {
    return (
      <div className="prefs block">
        {Object.entries(settings).map(e => {
          let label = e[0].charAt(0).toUpperCase() + e[0].slice(1);
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