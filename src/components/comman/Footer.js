import React from 'react';
import { NavLink } from 'react-router-dom';

import { _t, setLanguage } from '../../shared/translation';
class Footer extends React.Component {
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
        <div className="main-footer">
          <div className=" d-flex flex-column align-items-center">
            <div className="main-footer_nav-wrapper">
              <div className="main-footer_nav container d-flex p-relative">
                <NavLink to="/">{_t('About')}</NavLink>
                <NavLink to="/">{_t('Support')}</NavLink>
                <NavLink to="/">{_t('Terms of Use')}</NavLink>
                <NavLink to="/">{_t('Privacy Policy')}</NavLink>
                <NavLink to="/">{_t('Notices')}</NavLink>
                <NavLink to="/">{_t('Contact Us')}</NavLink>
                <div className="main-footer_social-icons">
                  <NavLink to="/"><img src="images/facebook-icon.png" alt="" /></NavLink>
                  <NavLink to="/"><img src="images/insta-icon.png" alt="" /></NavLink>
                  <NavLink to="/"><img src="images/twitter-icon.png" alt="" /></NavLink>
                </div>
              </div>
            </div>
            <span className="copyright container text-center">{_t('All rights reserved to')} Suponic Games</span>
          </div>
        </div>
      );
    }
  }

export default Footer;