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
    this.changePage = this.changePage.bind(this)
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

  changePage(i){
    this.setState({ pageNumber: i });
    this.update()
  }

  render() {
    console.log(`Curent page = ${this.state['pageNumber']}`)
    let changePage = this.changePage
    return (
      <div className="dishesContainer">
        {this.display(this.state['curentPageContent'])}
        <Pagination 
          changePage={changePage.bind(this)} 
          curent={this.state['pageNumber']}
          pagesQuantity={this.state['pagesSum']}
          
          />
      </div>
    );
  }
}

export default CreateMenu;
