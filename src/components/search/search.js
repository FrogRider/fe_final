import React from "react";
import "./search.scss";
import Service from '../serviceFuncs'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFor: "",
      items: [],
      searchedItem: {}
    };
  }

  componentDidMount(){
    Service.prepareData().then(res => {
      this.setState({'items': res})
    })
  }

  handleSubmit = e => { //get val from input
    let i = this.input.value
    e.preventDefault();
    this.setState({ 'searchFor': i });
  };

  searchFor = () => {
    let items = this.state['items'];
    // items.map(i => i['name'].toLowerCase());
    items.forEach(i => i['name'] = i['name'].toLowerCase())
    let res;
    let searchFor = this.state['searchFor'].toLocaleLowerCase()


    if(this.state['searchFor'] !== ''){
      res = items.filter(i => i['name'].indexOf(searchFor) !== -1)

      if(res.length === 0)
        res = items.filter(i => i['name'].indexOf(Service.transpileRuEng(searchFor)) !== -1)

      res.forEach(i => i['name'] = Service.firstLetterToUpper(i['name']))
      console.log(res)
    }
    
    if(res !== undefined)
      this.setState({'searchedItem': res})
  }

  render() {
    // console.log('items',this.state['searchedItem'])
    return (
      <div className={`search ${this.props.visible ? '' : 'hideSearch'}`}>
        <i className='closeSearch' onClick={()=>{this.props.close()}}></i>
        <form onSubmit={this.handleSubmit}>
        <label onClick={()=>{this.searchFor()}} htmlFor="username">
          Search
        </label>
        <br />
        <input
          onInput={e => {this.handleSubmit(e)}}
          type="text"
          name="username"
          ref={input => (this.input = input)}
        />
      </form>
    {Array.from(this.state['searchedItem']).map(i =>{return <p key={i['name'] }>{i['name']}</p>})}
      </div>
    );
  }
}

export default Search;
