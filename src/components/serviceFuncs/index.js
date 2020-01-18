import axios from 'axios';
import state from '../state/someState';

class Services {
  // addToAnOrder (nameToFind, quantity) {
  //   let order;
  //   let local = JSON.parse(localStorage.getItem('orded'))

  // }
  switchKitchen = k => {
    let data = localStorage.getItem('settings');
    if (data === null) data = state['prefs'];
    else data = JSON.parse(data);
    if (data['kitchens'].indexOf(k) === -1) data['kitchens'].push(k);
    else {
      let idx = data['kitchens'].indexOf(k);
      data['kitchens'].splice(idx, 1);
    }
    localStorage.setItem('settings', JSON.stringify(data));
  };

  getLoacalSettings() {
    let data = localStorage.getItem('settings');
    if (data === null) return state['prefs'];
    else return JSON.parse(data);
  }

  changeSettingByType = (type) => {
    let s = this.getLoacalSettings();
    s[type] = !s[type]
    
    localStorage.setItem('settings', JSON.stringify(s));
  }

  getPage = () => {
    const urlObject = new URL(window.location);
    const page = urlObject.searchParams.get('page');
    if (page === null) return 0;
    else return +page;
  };

  clearOrder = () => {
    localStorage.setItem('order', JSON.stringify([{ day: this.getWeekDay() }]));
  };

  getOrder = () => {
    let raw = localStorage.getItem('order');

    if (raw === null) return [{ day: this.getWeekDay() }];
    else return JSON.parse(raw);
  };

  removeFromOrder = name => {
    let order = this.getOrder();

    let item = order.find(e => e['name'] === name);
    if (item !== undefined) {
      order.splice(0, 1);
      let idx = order.indexOf(item);
      order.splice(idx, 1);
      order.unshift({ day: this.getWeekDay() });
      localStorage.setItem('order', JSON.stringify(order));
    } else console.log('nothing to delete')
    return order;
  };

  addToOrder(name, amount, price) {
    let raw = localStorage.getItem('order');
    let data;

    if (raw === null) data = [{ day: this.getWeekDay() }];
    else data = JSON.parse(raw);

    let dayCheck = data.find(e => e['day'] !== 'undefined')['day'];
    // console.log(dayCheck);
    //clear order if it wasn't created today
    if (dayCheck !== this.getWeekDay()) {
      console.log('order cleared');
      data = [{ day: this.getWeekDay() }];
    }

    let find = data.find(e => e['name'] === name);
    switch (typeof find) {
      case 'undefined':
        data.push({ name: name, q: amount, p: price });
        break;
      case 'object':
        let idx = data.indexOf(find);
        data[idx]['q'] += amount;
        break;
      default:
        break;
    }
    localStorage.setItem('order', JSON.stringify(data));
    // console.log(data);
  }

  getWeekDay = () => new Date(Date.now()).getDay();

  async prepareData() {
    
    let updatedMeals; //final filtered data goes here
    //get dishes from json
    await axios.get('/structure.json').then(res => {
      updatedMeals = res['data'];
    });

    //filter dishes by days
    updatedMeals.forEach(meal => {
      let days = meal['availableOn'];
      if (days.indexOf(this.getWeekDay()) === -1) {
        if(meal['disabled'] === false) {
          if(state['debugger'] === true)
            console.log(`%c ${meal['name']} disabled by day ${this.getWeekDay()} `, 'color: #bada55');
          meal['disabled'] = true
        }
      }
    });

    //filter by settngs
    updatedMeals.forEach(meal => {
      //comparator function
      let localSettings = this.getLoacalSettings()
      let compare = setting => {
        if (meal[setting] === false && localSettings[setting] === true) {
          if(meal['disabled'] === false) {
            if(state['debugger'] === true)
              console.log(`%c ${meal['name']} disabled by ${setting} `, 'color: #bada55')
            meal['disabled'] = true
          }
        }
      };
      const toCompare = ['vegan', 'diet', 'gluten_free'];
      toCompare.forEach(i => {
        compare(i);
      });
    });

    let kitchens = this.getLoacalSettings()['kitchens'];
    updatedMeals.forEach(meal => {
      // console.log(kitchens.indexOf(meal['kitchen']) !== -1)
      if (kitchens.indexOf(meal['kitchen']) !== -1) {
        if(meal['disabled'] === false) {
          if(state['debugger'] === true)
            console.log(`%c ${meal['name']} disabled by ${kitchens} `, 'color: #bada55');
          meal['disabled'] = true
        }
      }
    });

    return updatedMeals.filter(e => e['disabled'] === false);
  }
}

let s = new Services();

export default s;
