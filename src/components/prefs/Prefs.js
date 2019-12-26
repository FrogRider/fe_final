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
      noGluten: settings['noGluten']
    }
  }

  componentDidMount(){ //load data from localStore on reload
    let raw = localStorage.getItem('settings');
    if (raw !== null) {
      let data = JSON.parse(raw);
      for (let key in data) {
        this.props.dispatch({ type: 'setPref', payload: [key, data[key]] });
      }
      for(let i in this.state) {
        this.setState({ [i] : settings[i]})
      }
    }

      // Object.entries(settings).map(el => {
      //   if(el[0] === 'theme')
      //     {
      //       settings['theme'] = 'text'
      //     }
      //     return settings
      //   }
      //   )
      // console.log(settings)
  }

  change = type => {
    this.props.dispatch({ type: 'changePref', payload: type });
    this.setState({ [type] : !this.state[type]}); //just for re-rendering checkboxes
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  render() {
    return(
      <div className="prefs block">
        <label><input checked = {settings['vegan']} onChange={()=>{this.change('vegan')}} type="checkbox"/> Vegan</label>

        <label><input checked = {settings['diet']} onChange={()=>{this.change('diet')}} type="checkbox"/> Diet</label>
        
        <label><input checked = {settings['noGluten']} onChange={()=>{this.change('noGluten')}} type="checkbox"/> Gluten free</label>
      </div>
    )
  }
};

export default Prefs;