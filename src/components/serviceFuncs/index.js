class Services {
  // addToAnOrder (nameToFind, quantity) {
  //   let order;
  //   let local = JSON.parse(localStorage.getItem('orded'))

  // }

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
}

let s = new Services();

export default s;
