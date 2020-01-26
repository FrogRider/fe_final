let initialState = {
  'prefs':{
    'pagination': 6, // items per page
    'vegan': false,   //show only vegan dishes
    'diet': false,    //show only diet dishes
    'gluten_free': false,//show only gluten free dishes
    'kitchens': [] //allowed kitchens. all if empty
  },
  //console log data preparation process and others
  'debugger': true
}

export default initialState;