import React from 'react';
import Dish from './dishItem';
import state from '../../state/someState';
import Service from '../../serviceFuncs';
import Pagination from './paginationController'
import '../menues.scss';

class CreateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      curentPageContent: [],
      pageNumber: 0,
      pagesSum: 0
    };
    this.handler = this.handler.bind(this)
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
              item['picture'],
              item['type']
            ]}
            key={item['name']}
          />
        );
      }
    });
  };

  changePage = i => {
    if (i < 0) i = 0;
    if (i > this.state['pagesSum'] - 1) i = this.state['pagesSum'] - 1;
    console.log(i);
    this.setState({ pageNumber: i });
    this.update();
    // let href = window.location.href;
    console.log(this.state['pagesSum'])
  };

  update = () => {
    let perPage = state['prefs']['pagination'];
    Service.prepareData(state['prefs']).then(res => {
      this.setState({
        pagesSum: Math.ceil(res.length / state['prefs']['pagination']),
        meals: res,
        curentPageContent: res.splice(
          perPage * this.state['pageNumber'],
          perPage
        )
      });
    });
    // console.error(this.state['pagesSum'])
  };

  componentDidMount() {
    this.setState({ pageNumber: Service.getPage() });
    Service.backupSettings(this.props.dispatch);
    this.update();
    console.log('Current day is ', Service.getWeekDay());
  }

  handler(i){
    this.setState({ pageNumber: i });
    this.update()
  }

  render() {
    console.log(`Curent page = ${this.state['pageNumber']}`)
    let handler = this.handler
    return (
      <div className="dishesContainer">
        {this.display(this.state['curentPageContent'])}

        {/* <button
          onClick={() => {
            this.changePage(this.state['pageNumber'] - 1);
          }}
          className="menuButton"
        >
          Prev page
        </button>

        <button
          onClick={() => {
            this.changePage(this.state['pageNumber'] + 1);
          }}
          className="menuButton"
        >
          Next page
        </button> */}
        <Pagination 
          page={handler.bind(this)} 
          curent={this.state['pageNumber']}
          pagesQuantity={this.state['pagesSum']}
          
          />
      </div>
    );
  }
}

export default CreateMenu;
