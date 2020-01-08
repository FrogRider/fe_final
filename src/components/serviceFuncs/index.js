class Services {
  // addToAnOrder (nameToFind, quantity) {
  //   let order;
  //   let local = JSON.parse(localStorage.getItem('orded'))
    
  // }

  backupOrder(dispatch) {
    let raw = localStorage.getItem('order');
    if (raw !== null) {
      let data = JSON.parse(raw);
      data.map(i => {
        dispatch({ type: 'addToOrder', payload: [i['name'], i['quantity']] });
      });
    }
  }

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
