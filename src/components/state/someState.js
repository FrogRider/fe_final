let initialState = {
  'prefs':{
    'pagination': 10, //10 dishes per page
    // 'theme': 'dark',  //default theme
    'vegan': false,   //show only vegan dishes
    'diet': false,    //show only diet dishes
    'gluten_free': false,//show only gluten free dishes
    'countries': [] //allowed kitchens. all if empty
  },
  'order': [],        //dishes ids goes here
  'testing':[]
}

export default initialState;