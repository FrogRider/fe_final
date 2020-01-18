import React from 'react';
import state from '../../state/someState';
import Service from '../../serviceFuncs';
import Pagination from './paginationController';
import Render from './renderMenu'
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

  update = () => {
    let perPage = state['prefs']['pagination'];
    Service.prepareData().then(res => {
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

  changePage(i){
    this.setState({ pageNumber: i });
    this.update()
  }

  render() {
    let changePage = this.changePage
    return (
      <div className="dishesContainer">
        <Render items={this.state['curentPageContent']} />
        <Pagination 
          changePage={changePage.bind(this)} //func that changes curent page 
          curent={this.state['pageNumber']}
          pagesQuantity={this.state['pagesSum']}
          
          />
      </div>
    );
  }
}

export default CreateMenu;
