import React from 'react';
import { NavLink } from 'react-router-dom';

class Mainnav extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        imgType:""
      }
      this.checkRoute=this.checkRoute.bind(this);  
    }
    
    checkRoute(e){
      console.log('current route is here',this.props.link)
      localStorage.setItem('route',this.props.link)
      
    }
    
  
    render() {
      return (
        
        <NavLink to={this.props.link} onClick={(e)=>this.checkRoute(e)}  activeClassName="selected"  onMouseEnter={() => this.setState({imgType:'-hover'})} onMouseLeave={() => this.setState({imgType:''})}  
        className={"main-nav_icon-text d-flex align-items-center text-yellow"}>
            <img src={"images/nav-icon" + this.state.imgType + ".png"}  alt="" />
            <span>{this.props.text}</span>
        </NavLink>
      );
    }
  }

  export default Mainnav;