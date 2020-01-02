let initialState = {
  'dishes': [],       //fills from json
  'prefs':{
    'pagination': 10, //10 dishes per page
    'theme': 'dark',  //default theme
    'vegan': false,   //show only vegan dishes
    'diet': false,    //show only diet dishes
    'gluten_free': false,//show only gluten free dishes
    // 'caloriesFromTo': [0,1000],
  },
  'order': [],        //dishes ids goes here
  'testing':[]
}

export default initialState;