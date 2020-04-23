import React from 'react';
import { NavLink } from 'react-router-dom';


class FbFeedCard extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
      }
      
    }
  
    
  
    render() {
      return (
        <div className="fb-feed-card p-relative animate">
            <img src={"images/fb-feed-img" + this.props.img + ".png"} alt="" className="fb-feed-card_img" />
            <NavLink to="/" className="fb-feed-card_content text-white">
                <h2 className="title text-yellow font-bold">{this.props.title}</h2>
                <slot></slot>
                {this.props.content.map((c,key)=>{
                    return(
                        <p key={key}>{c}</p>
                    )
                })}
            </NavLink>
        </div>
      );
    }
  }

export default FbFeedCard;
  
