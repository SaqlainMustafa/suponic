import React from 'react';
import { NavLink } from 'react-router-dom';

import BtnDiamond from './BtnDiamond';
import Rating from './Rating';
import { _t, setLanguage } from '../../shared/translation';
class GameCard extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
      }
      
    }
  
    
  
    render() {
      let lang = window.localStorage.getItem('lang');
      if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
      setLanguage(lang)
      return (
        <div className="game-card d-flex flex-column align-items-center text-center p-relative animate">
            <img src={this.props.img} alt="" className="game-card_img" />
            <h1 className="text-white grid-col-span title font-bold">{this.props.title}</h1>
            <Rating score={this.props.score} />
            <span className="game-card_desc text-white">{this.props.desc}</span>
            <NavLink to={this.props.link} ><BtnDiamond  text={_t('Download')} /></NavLink>
        </div>
      );
    }
}

export default GameCard;
