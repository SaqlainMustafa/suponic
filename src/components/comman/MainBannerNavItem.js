import React from 'react';



class MainBannerNavItem extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
      }
      
    }
  
    
  
    render() {
      return (
        <>
            <img src={"images/" + this.props.src} alt="" />
            <span className='text-white'>{this.props.text}</span>
        </>
      );
    }
}

export default MainBannerNavItem;
