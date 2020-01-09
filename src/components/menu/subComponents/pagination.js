import React from 'react';
import Dish from './dishItem';
import state from '../../state/someState';
import Service from '../../serviceFuncs';
import axios from 'axios';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
  }

  async prepareData() {
    let updatedMeals = this.state.meals; //final filtered data goes here
    //get dishes from json
    await axios.get('./structure.json').then(res => {
      updatedMeals = res['data'];
    });

    //filter dishes by days
    updatedMeals.map(meal => {
      let days = meal['availableOn'];
      if (days.indexOf(Service.getWeekDay()) === -1) {
        meal['disabled'] = true;
      }
    })
    
    //filter by settngs
    updatedMeals.map(meal => {
      let compare = (what) => {
        let prefs = state['prefs']
        if(meal[what] === false && prefs[what] === true) {
          meal['disabled'] = true
        }
      }
      const toCompare = ['vegan', 'diet', 'gluten_free'];
      toCompare.map(i => {
        compare(i);
      })
      // let settingsToCheck = ['vegan', 'diet', 'gluten_free'] 

      
    })
    
    this.setState({
      meals: updatedMeals
    });
  }

  display = items => {
    return items.map(item => {
      if (item['disabled'] === false) {
        return (
          <Dish
            settings={[item['name'], item['price'], item['calories'], item['picture']]}
            key={item['name']}
          ></Dish>
        );
      }
    });
  };

  componentDidMount() {
    Service.backupSettings(this.props.dispatch);
    this.prepareData();
    console.log('Current day is ', Service.getWeekDay())
  }

  render() {
    // console.log(this.state['meals']);
    return (
      <div className="dishesContainer">{this.display(this.state['meals'])}</div>
    );
  }
}

export default Pagination;
