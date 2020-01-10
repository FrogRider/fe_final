import React from 'react';
import Dish from './dishItem';
import state from '../../state/someState';
import Service from '../../serviceFuncs';

class CreateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      curentPageContent: [],
      pageNumber: 0,
      pagesSum: 0
    };
  }

  display = items => {
    return items.map(item => {
      if (item['disabled'] === false) {
        return (
          <Dish
            settings={[
              item['name'],
              item['price'],
              item['calories'],
              item['picture']
            ]}
            key={item['name']}
          ></Dish>
        );
      }
    });
  };

  changePage = (i) => {
    // let pagesNumber;
    // console.log(pagesNumber)
    if(i < 0) i = 0
    if(i > this.state['pagesSum'] - 1) i = this.state['pagesSum'] -1
    console.log(i)
    this.setState({pageNumber: i})
    this.update()
  }

  update = () => {
    Service.prepareData(state['prefs']).then(res => {
      this.setState({
        pagesSum: Math.ceil(res.length / state['prefs']['pagination']),
        meals: res,
        curentPageContent: res.splice(5 * this.state['pageNumber'], 5)
      });
    })
  }

  componentDidMount() {
    this.setState({pageNumber: Service.getPage()})
    Service.backupSettings(this.props.dispatch);
    this.update()
    console.log('Current day is ', Service.getWeekDay());
  }

  render() {
    console.log(this.state['meals']);
    return (
      <div className="dishesContainer">
        {this.display(this.state['curentPageContent'])}
        <button
          onClick={() => {
            this.changePage(this.state['pageNumber'] + 1);
          }}
        >
          Next page
        </button>
        <button
          onClick={() => {
            this.changePage(this.state['pageNumber'] - 1);
          }}
        >
          Prev page
        </button>
      </div>
    );
  }
}

export default CreateMenu;
