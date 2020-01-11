let initialState = {
  'prefs':{
    'pagination': 5, // items per page
    'vegan': false,   //show only vegan dishes
    'diet': false,    //show only diet dishes
    'gluten_free': false,//show only gluten free dishes
    'kitchens': [] //allowed kitchens. all if empty
  }
}

export default initialState;