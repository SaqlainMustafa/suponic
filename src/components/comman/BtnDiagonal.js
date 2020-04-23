import React from 'react';


class BtnDiagonal extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        src:""
      }
      
    }
  
    
  
    render() {
      return (
        <button className={this.props.className + " btn-diagonal p-relative"} onClick={this.props.onClick} onMouseEnter={() => this.setState({src:'-hover'})} onMouseLeave={() => this.setState({src:''})}>
            <img src={"images/btn-diagonal" + this.state.src + ".png"} alt="" />
            <div className='text-white'>{this.props.text}</div>
        </button>
      );
    }
  }

  export default BtnDiagonal;