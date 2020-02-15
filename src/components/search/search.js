import React from 'react';
import Service from '../serviceFuncs';
import state from '../state/someState';
import Close from './close';
import './css/search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: '',
      items: [],
      searchedItem: {}
    };
  }

  componentDidMount() {
    Service.prepareData().then(res => {
      this.setState({ items: res });
    });
  }

  handleSubmit = e => {
    //get val from input
    let i = this.input.value;
    e.preventDefault();
    this.setState({ searchFor: i });
  };

  searchFor = () => {
    let items = this.state['items'];
    items.forEach(i => (i['name'] = i['name'].toLowerCase()));
    let res;
    let searchFor = this.state['searchFor'].toLocaleLowerCase();

    if (this.state['searchFor'] !== '') {
      res = items.filter(i => i['name'].indexOf(searchFor) !== -1);

      // console.log(Service.transpileRuEng(searchFor));

      if (res.length === 0 && Service.transpileRuEng(searchFor) !== '')
        res = items.filter(
          i => i['name'].indexOf(Service.transpileRuEng(searchFor)) !== -1
        );

      res.forEach(i => (i['name'] = Service.firstLetterToUpper(i['name'])));
      // console.log(res);
    }

    if (res !== undefined) this.setState({ searchedItem: res });
  };

  render() {
    let items = Array.from(this.state['searchedItem']);
    let perPage = state['prefs']['pagination'];
    let foundItems =
      items.length === 0 ? 
        <p className="emptySearch">Nothing found...</p>
       : (
         <div className="searchedItems">
        {items.map(i => 
          <p key={i['name']}>
            {i['name'] +
              '. Located on page ' +
              Math.ceil((this.state['items'].indexOf(i) + 1) / perPage)}
          </p>
        )}
        </div>
      );

    return (
      <div className={`search ${this.props.visible ? '' : 'hideSearch'}`}>
        <Close close = {this.props.close}/>
        <div className="searchPanel">
          <form onSubmit={this.handleSubmit}>
            <label onClick={() => this.searchFor()} htmlFor="username" />
            <br />
            <input
              placeholder='Search...'
              onInput={e => this.handleSubmit(e)}
              type="text"
              name="username"
              ref={input => (this.input = input)}
            />
          </form>
        </div>
        {foundItems}
      </div>
    );
  }
}

export default Search;
