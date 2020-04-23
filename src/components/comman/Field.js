import React from 'react';


class Field extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
      }
      
    }
  
    
  
    render() {
      return (
        <input type={this.props.type} value={this.props.value} min={this.props.min} name={this.props.name} id="" onChange={this.props.onChange} className={"text-white w-100 field "+this.props.className} placeholder={this.props.placeholder} />
      );
    }
  }

export default Field;