import React from 'react';



class BtnDiamond extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        src:""
      }
      
    }
  
    
  
    render() {
      return (
        <a style={{textDecoration: "none",cursor:"pointer", pointerEvents: this.props.disabled? "none" : "all"}} onClick={this.props.onClick} className={this.props.className + " btn-diamond text-white font-bold text-center d-flex align-items-center p-relative"} href={this.props.link}>
          {this.props.text}  
        </a>
      );
    }
  }

  export default BtnDiamond;
  