import React from 'react';
import { NavLink } from 'react-router-dom';
class ArticleCard extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
      }
      
    }
  
    
  
    render() {
      return (
        <div className="article-card animate">
            <h1 className="article-card_number font-bold">{this.props.number}</h1>
            <NavLink to={"/noticeAndNews?id="+this.props.number}><h2 className="article-card_headline text-white font-bold p-relative">{this.props.headline}</h2></NavLink>
            <div className="article-card_article-body">
                <slot></slot>
              {this.props.content.map((c,key)=>{
                return(
                  <p key={key}>{c}</p>
                )
              })}
            </div>
        </div>
      );
    }
}

export default ArticleCard;
