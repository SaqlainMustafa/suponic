import React from 'react';
// import BtnDiamond from './BtnDiamond';
import Field from '../../components/comman/Field';

import { _t, setLanguage } from '../../shared/translation';
class SgcCard extends React.Component {
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
        <div className="sgc-card text-center">
            <div className="coins d-flex flex-column align-items-center">
                <h5 className="text-yellow font-bold">${this.props.amount}</h5>
                <img src={"images/" + this.props.amount + "sgc-coins.png"} alt="" />
            </div>
            <div className="amount-and-coin text-white font-bold">{this.props.amount} <span>SGC</span> <img src="images/coin-avail-icon.png" alt="" className="coin"/></div>
             <label style={{fontSize:"12px",color:"#fff"}}>{_t("NoOfPackage")}</label>
            <Field type='number' name={this.props.name} onChange={this.props.onChange} value={this.props.value} min="1"/>
            <button className="purchase text-white font-bold" style={{marginTop:"10px"}} onClick={this.props.onClick}>{_t('Purchase')}</button>
        </div>
      );
    }
}

export default SgcCard;