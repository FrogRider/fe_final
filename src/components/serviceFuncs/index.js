import axios from 'axios';
import state from '../state/someState';

class Services {
  firstLetterToUpper = string => {
    return [...string[0].toUpperCase(), ...string.slice(1)].join('');
  };

  transpileRuEng = str => {
    //next two lines contains appropriate letters from two alphabets as string,
    //splitted to an array
    const ru = [...'йцукенгшщзхъфывапролджэячсмитьбю'];
    const eng = [...`qwertyuiop[]asdfghjkl;'zxcvbnm,.`];
    let split = [...str];
    /*replace letter to appropriate from eng alphabet
      current letter in split array \/     appropriate letter \/ */
    split.forEach(e => (split[split.indexOf(e)] = eng[ru.indexOf(e)]));

    return split.join('');
  };

  resetKitchens = () => localStorage.setItem('settings', JSON.stringify([]));

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

  resetLocalSettings = () => {
    localStorage.setItem('settings', JSON.stringify(state['prefs']));
  };

  getLoacalSettings = () => {
    let data = localStorage.getItem('settings');
    if (data === null) return state['prefs'];
    else return JSON.parse(data);
  };

  changeSettingByType = type => {
    let s = this.getLoacalSettings();
    s[type] = !s[type];

    localStorage.setItem('settings', JSON.stringify(s));
  };

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
    } else console.log('nothing to delete');
    return order;
  };

  addToOrder = (name, amount, price, availableOn = []) => {
    let raw = localStorage.getItem('order');
    let data;

    if (raw === null) data = [{ day: this.getWeekDay() }];
    else data = JSON.parse(raw);

    let dayCheck = data.find(e => e['day'] !== 'undefined')['day'];
    //clear order if it wasn't created today
    if (dayCheck !== this.getWeekDay()) {
      if (state['debugger'])
        console.log('%c order cleared, time exceeded ', 'color: orange');
      data = [{ day: this.getWeekDay() }];
    }

    let find = data.find(e => e['name'] === name);
    switch (typeof find) {
      case 'undefined':
        data.push({ name: name, q: amount, p: price, a: availableOn });
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
  };

  getWeekDay = () => new Date(Date.now()).getDay();

  sortByType = (data, type = 'default') => {
    switch (type) {
      case 'priceLowHigh':
        return data.sort((a, b) => a['price'] - b['price']);
      case 'priceHighLow':
        return data.sort((a, b) => b['price'] - a['price']);
      case 'nameAB':
        return data.sort((a, b) => a['name'].localeCompare(b['name']));
      case 'nameBA':
        return data.sort((a, b) => b['name'].localeCompare(a['name']));
      case 'default':
        return data;
      default:
        if(state['debugger']) console.log(
          `%c ${type} doesn't supported for sorting! `,
          'color: orange'
        );
        
    }
  };

  async prepareData() {
    let updatedMeals; //final filtered data goes here
    //get dishes from json
    await axios.get('/structure.json').then(res => {
      updatedMeals = res['data'];
    });

    //filter dishes by days
    updatedMeals.forEach(meal => {
      let days = meal['availableOn'];
      //TODO: fake day
      if (days.indexOf(/*fake day here*/this.getWeekDay()) === -1) {
        if (meal['disabled'] === false) {
          if (state['debugger'] === true)
            console.log(
              `%c ${meal['name']} disabled by day ${this.getWeekDay()} `,
              'color: #bada55'
            );
          meal['disabled'] = true;
        }
      }
    });

    //filter by settngs
    updatedMeals.forEach(meal => {
      //comparator function
      let localSettings = this.getLoacalSettings();
      let compare = setting => {
        if (meal[setting] === false && localSettings[setting] === true) {
          if (meal['disabled'] === false) {
            if (state['debugger'] === true)
              console.log(
                `%c ${meal['name']} disabled by ${setting} `,
                'color: #bada55'
              );
            meal['disabled'] = true;
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
        if (meal['disabled'] === false) {
          if (state['debugger'] === true)
            console.log(
              `%c ${meal['name']} disabled by ${kitchens} `,
              'color: #bada55'
            );
          meal['disabled'] = true;
        }
      }
    });

    return updatedMeals.filter(e => e['disabled'] === false);
  }
}

let s = new Services();

export default s;
