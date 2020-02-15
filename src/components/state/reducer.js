// let getJson = async () => {
//   let resp = await fetch('/structure.json'); //public folder
//   let json = await resp.json();
//   return await json;
// };

let reducer = (state, action) => {
  switch (action.type) {
    // case 'say': {
    //   console.log(state);
    //   return state;
    // }

    case 'errase': {
      state['dishes'] = [];
      return state;
    }

    case 'changePref': {
      let key = action.payload;
      // state['prefs'][key] = !state['prefs'][key];
      Object.entries(state).map(el => {
        if (el[0] === 'prefs') {
          Object.entries(el).map(el => {
            if (typeof el[1] === 'object') el[1][key] = !el[1][key];
            return 0
          });
        }
      });
      // console.log(state['prefs'])
      return state;
    }

    case 'setPref': {
      let [key, value] = [...action.payload];
      // state['prefs'][val[0]] = val[1] //- old version with state changing
      Object.entries(state).map(el => {
        //iterates through state looking for prefs
        if (el[0] === 'prefs') {
          Object.entries(el).map(el => {
            //iterates through state[prefs] looking for key
            if (typeof el[1] === 'object') el[1][key] = value;
          });
        }
      });
      return state;
    }

    default: {
      console.error(`${action.type} doesn't support`);
      return state;
    }
  }
};

export default reducer;
