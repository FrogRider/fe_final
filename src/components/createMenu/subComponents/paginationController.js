import React from 'react';
import '../css/menues.scss'

class PaginationController extends React.Component {
  // constructor(props) {
  //   super(props);
    
  // }
  page = this.props.changePage; //binded function

  fill = page => {
    let curent = this.props.curent;
    let q = this.props.pagesQuantity;

    if(q !== 2 && q !== 1) {
      switch (page) {
        case 0:
          return [0, 1, 2];
        case (this.props.pagesQuantity - 1):
          return[curent - 2, curent - 1, curent];
        default:
          return[curent - 1, curent, curent + 1];
      }
    }

    if(q === 2) return ['', 0, 1];
    if(q === 1) return ['', 0, ''];
  };

  buttons = this.fill(this.props.curent);

  change = i => {
    this.page(i);
    this.buttons = this.fill(this.props.curent);
  };

  render() {
    this.buttons = this.fill(this.props.curent)
    return (
      <div className='pagination'>
        <div 
          onClick={()=>{this.change(0)}} 
          className='paginationFirst'
          title='1 page'
        />
        {this.buttons.map(b => {
          return (
            <div 
              className={b === this.props.curent ? 'curentPagination' : 0} 
              key={b} 
              onClick={()=>{if(b !== '') this.change(b)}}>
                {b !== '' ? b+1 : '...'}
            </div>
          )
        })}
        <div 
          onClick={()=>{this.change(this.props.pagesQuantity - 1)}}
          className='paginationLast'
          title={this.props.pagesQuantity + ' page'}
        /> 
      </div>
    );
  }
}

export default PaginationController