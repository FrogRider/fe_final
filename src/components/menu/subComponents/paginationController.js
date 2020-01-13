import React from 'react';
import '../menues.scss'

class PaginationController extends React.Component {
  constructor(props) {
    super(props);
  }

  fill = page => {
    switch (page) {
      case 0:
        return [0, 1, 2];
      case (this.props.pagesQuantity - 1):
        return[this.curent - 2, this.curent - 1, this.curent];
      default:
        return[this.curent - 1, this.curent, this.curent + 1];
    }
  };

  page = this.props.page; //func

  buttons = this.fill(this.props.curent);
  
  componentDidUpdate(){
    this.curent = this.props.curent;
    this.buttons = this.fill(this.props.curent);
  }

  change = i => {
    this.page(i);
    
    this.buttons = this.fill(this.props.curent);
    // this.curent = this.props.curent
  };

  render() {
    console.log(this.props.pagesQuantity)
    return (
      <div className='pagination'>
        <div onClick={()=>{this.change(0)}}> {'<<'} </div>
        {this.buttons.map(b => {
          return (
            <div 
              className={b === this.props.curent ? 'curentPagination' : 0} 
              key={b} 
              onClick={()=>{this.change(b)}}>
                {b+1}
            </div>
          )
        })}
        <div onClick={()=>{this.change(this.props.pagesQuantity - 1)}}> {'>>'} </div>
      </div>
    );
  }
}

export default PaginationController