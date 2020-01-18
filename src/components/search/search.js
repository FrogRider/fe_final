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
    let res;

    if(this.state['searchFor'] !== ''){
      res = items.filter(i => i['name'].indexOf(this.state['searchFor']) !== -1)
    }
    
    if(res !== undefined)
      this.setState({'searchedItem': res})
  }

  


  render() {
    console.log('items',this.state['searchedItem'])
    return (
      <div className="search" onClick={()=>{this.searchFor()}}>
        <form onSubmit={this.handleSubmit}>
        <label onClick={this.handleSubmit} htmlFor="username">
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
