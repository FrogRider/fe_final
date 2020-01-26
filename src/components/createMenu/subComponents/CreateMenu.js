import React from 'react';
import state from '../../state/someState';
import Service from '../../serviceFuncs';
import Pagination from './paginationController';
import Render from './renderMenu';
import Sort from './sort'
// import '../css/menues.scss';

class CreateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      curentPageContent: [],
      pageNumber: 0,
      pagesSum: 0,
      sortType: 'default'
    };
    this.changePage = this.changePage.bind(this);
    // this.sortContent = this.sortContent.bind(this);
  }

  update = () => {
    Service.prepareData().then(res => {
      Service.sortByType(res, this.state['sortType'])
      let perPage = state['prefs']['pagination'];
      this.setState({
        pagesSum: Math.ceil(res.length / perPage),
        meals: res,
        curentPageContent: res.splice(
          perPage * this.state['pageNumber'],
          perPage
        )
      });
    });
  };

  componentDidMount() {
    this.setState({ pageNumber: Service.getPage() });
    this.update();
  }

  changePage(i) {
    this.setState({ pageNumber: i });
    this.update();
  }

  handleSort(event) {
    // getting value from select (sort) field
    this.setState({sortType:event.target.value})
    this.update()
  }

  render() {
    let changePage = this.changePage;
    let handleSort = this.handleSort;
    return (
      <div className="dishesContainer">
        
        <Render items={this.state['curentPageContent']} />
        <Pagination
          changePage={changePage.bind(this)} //func that changes curent page
          curent={this.state['pageNumber']}
          pagesQuantity={this.state['pagesSum']}
        />
        <Sort val={this.state['sortType']} changeSortType={handleSort.bind(this)}/>
      </div>
    );
  }
}

export default CreateMenu;
