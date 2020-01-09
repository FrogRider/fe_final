import React from 'react';
import Dish from './dishItem';
import state from '../../state/someState';
import Service from '../../serviceFuncs';
import axios from 'axios';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      curentPageContent: [],
      pageNumber: 0
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
    })

    //filter only enabled ones
    let enabled = updatedMeals.filter(e => e['disabled'] == false)

    // console.log(updatedMeals)
    let page = this.state['pageNumber']
    this.setState({
      meals: enabled,
      curentPageContent: enabled.splice(5*page,5)
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
    // let count = new URLSearchParams( location.search ).get('p') || 1;
  }

  changePage(num){
    this.setState({pageNumber: num})
    this.prepareData();
  }

  render() {
    console.log(this.state['pageNumber']);
    return (
      <div className="dishesContainer">
        {this.display(this.state['curentPageContent'])}
        <button onClick={()=>{this.changePage(this.state['pageNumber'] + 1)}}>Page</button>
      </div>
    );
  }
}

export default Pagination;
