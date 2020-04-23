import React from 'react';
import BtnDiamond from './BtnDiamond';

class NewsCard extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
      }
      
    }
  
    
  
    render() {
      return (
        <div className="news-card p-relative animate">
            <img src={"images/" + this.props.character + "-character.png"} alt="" className="news-card_img" />
            <div className="news-card_content d-flex flex-column">
                <h5 className="news-card_title font-bold text-white">{this.props.title}</h5>
                <BtnDiamond text='Learn More' className="btn-diamond-transparent" />
                <p className="news-card_text">{this.props.para}</p>
            </div>
        </div>
      );
    }
}

export default NewsCard;

