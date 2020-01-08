let initialState = {
  'prefs':{
    'pagination': 10, //10 dishes per page
    // 'theme': 'dark',  //default theme
    'vegan': false,   //show only vegan dishes
    'diet': false,    //show only diet dishes
    'gluten_free': false,//show only gluten free dishes
    'countries': [] //allowed kitchens. all if empty
  },
  'pagination': [{page: 1, active: true },
                 {page: 2, active: false},
                 {page: 3, active: false},
                 {page: 4, active: false},
                 {page: 5, active: false}
                ],
  'order': [],        //dishes ids goes here
  'testing':[]
}

export default initialState;