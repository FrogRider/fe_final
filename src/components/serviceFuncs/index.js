import axios from 'axios';

class Services {
  // addToAnOrder (nameToFind, quantity) {
  //   let order;
  //   let local = JSON.parse(localStorage.getItem('orded'))

  // }

  getPage = () => {
    const urlObject = new URL(window.location);
    const page = urlObject.searchParams.get('page');
    if(page === null) return 0
    else return +page
  }
  addToOrder(name, amount) {
    let raw = localStorage.getItem('order');
    let data;

    if (raw === null) data = [{ day: this.getWeekDay() }];
    else data = JSON.parse(raw);

    let dayCheck = data.find(e => e['day'] !== 'undefined')['day'];
    console.log(dayCheck);
    //clear order if it wasn't created today
    if (dayCheck !== this.getWeekDay()) {
      console.log('order cleared');
      data = [{ day: this.getWeekDay() }];
    }

    let find = data.find(e => e['name'] === name);
    switch (typeof find) {
      case 'undefined':
        data.push({ name: name, q: amount });
        break;
      case 'object':
        let idx = data.indexOf(find);
        data[idx]['q'] += amount;
        break;
    }
    localStorage.setItem('order', JSON.stringify(data));
    console.log(data);
  }

  getWeekDay = () => new Date(Date.now()).getDay();

  backupSettings(dispatch) {
    let raw = localStorage.getItem('settings');
    if (raw !== null) {
      let data = JSON.parse(raw);
      for (let key in data) {
        dispatch({ type: 'setPref', payload: [key, data[key]] });
      }
    }
  }

  async prepareData(prefs) {
    let updatedMeals; //final filtered data goes here
    //get dishes from json
    await axios.get('/structure.json').then(res => {
      updatedMeals = res['data'];
    });

    //filter dishes by days
    updatedMeals.map(meal => {
      let days = meal['availableOn'];
      if (days.indexOf(this.getWeekDay()) === -1) {
        meal['disabled'] = true;
      }
    });

    //filter by settngs
    updatedMeals.map(meal => {
      let compare = what => {
        // let prefs = prefs;
        if (meal[what] === false && prefs[what] === true) {
          meal['disabled'] = true;
        }
      };
      const toCompare = ['vegan', 'diet', 'gluten_free'];
      toCompare.map(i => {
        compare(i);
      });
    });

    // console.log(updatedMeals)
    // let page = this.state['pageNumber'];
    // this.setState({
    //   meals: enabled,
    //   curentPageContent: enabled.splice(5 * page, 5)
    // });

    //return only enabled ones
    return updatedMeals.filter(e => e['disabled'] == false);
  }
}

let s = new Services();

export default s;