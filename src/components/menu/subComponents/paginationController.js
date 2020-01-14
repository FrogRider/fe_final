import React from 'react';
import '../menues.scss'

class PaginationController extends React.Component {
  constructor(props) {
    super(props);
    
  }
  page = this.props.changePage; //binded function

  fill = page => {
    let curent = this.props.curent
    switch (page) {
      case 0:
        return [0, 1, 2];
      case (this.props.pagesQuantity - 1):
        return[curent - 2, curent - 1, curent];
      default:
        return[curent - 1, curent, curent + 1];
    }
  };

  buttons = this.fill(this.props.curent);
  
  componentDidUpdate(){
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
        <div onClick={()=>{this.change(0)}}> 
          {'<<'} 
        </div>
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
        <div onClick={()=>{this.change(this.props.pagesQuantity - 1)}}> 
          {'>>'} 
        </div>
      </div>
    );
  }
}

export default PaginationController