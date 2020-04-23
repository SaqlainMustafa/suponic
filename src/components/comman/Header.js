
import React from 'react';
import Mainnav from '../comman/Mainnav';
import Services from '../../shared/Services.js';
import { NavLink } from 'react-router-dom';
import Field from '../comman/Field';
import BtnDiamond from '../comman/BtnDiamond';
// import { connect } from "react-redux";
// import {changeUserData } from '../../redux/actions/index';
import { _t, setLanguage } from '../../shared/translation';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        selectedValue:'',
        address:'',
        amount:'',
        disable:false,
        imgType:"",
        isDesktop: false,
        isValidNoti:false
      }
      this.services = new Services();
      this.change=this.change.bind(this);
      this.changeInput=this.changeInput.bind(this);
      this.closeModal=this.closeModal.bind(this);
      this.openWithdraw=this.openWithdraw.bind(this);
      this.Withdraw=this.Withdraw.bind(this);
      this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount() {
      this.updatePredicate();
      window.addEventListener("resize", this.updatePredicate);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
    }
    updatePredicate() {
      this.setState({ isDesktop: window.innerWidth > 767.98,isValidNoti:window.innerWidth > 992 });
    }
    openMenu(e){
      for (e of document.querySelectorAll('.main-header .menu-toggle')) {
        e.addEventListener('click', () => document.querySelector('.main-header .main-nav').classList.toggle('main-nav--visible'))
      }
    }
    
    UNSAFE_componentWillUpdate(){

      // console.log('userdata',this.props.userdata)
    }
    
    change(event){
      this.setState({selectedValue:event.target.value})
      console.log('event.target.value',event.target.value);
      window.localStorage.setItem("lang", event.target.value);
      window.location.reload();
    }
    openWithdraw(e){
      
      var modal = document.querySelector('.modal-withdraw');
      modal.style.display = 'block';
    }
    closeModal(){
      this.setState({
        amount:'',
        address:''
      })
      var modal = document.querySelector('.modal-withdraw');
      modal.style.display = 'none';

    }
    changeInput(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    Withdraw(){
      var data={
        "address": this.state.address,
        "amount": this.state.amount
       
      }
      this.setState({
        disable:true
      })
      console.log('data',data)
      this.services.withdraw(data,'/profile/withdrawal',(res)=>{
        console.log('res',res);
        this.setState({
          disable:false
        })
        if(res.status===200){
            this.services.successToast(res.data.message);
            this.closeModal();
        }
        else{
            this.services.errorToast(res.error)
        }
    })
    }
    render() {
      const isDesktop = this.state.isDesktop;
      const isValidNoti = this.state.isValidNoti;
      let lang = window.localStorage.getItem('lang');
      if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
      setLanguage(lang)
      return (
        <>
        <div className="container_1200 d-flex align-items-center">
        {/* <NavLink to="/"><i className="fa fa-home" style={{color:"#fcae08", fontSize:"60px",marginTop:"20px"}}></i></NavLink> */}
          <header className="d-flex align-items-center main-header container p-relative">
          
          <div style={{cursor:"pointer"}}><a href="/home" ><img src="images/main-logo.png" alt="" className="main-logo" /></a></div>
          <nav className="main-nav d-flex align-items-center p-relative">
            {/* <Mainnav text="SGC MLM" link='https://mlm.suponicesports.com/' /> */}
            <a href="https://mlm.suponicesports.com/" target="_blank"   activeClassName="selected"  onMouseEnter={() => this.setState({imgType:'-hover'})} onMouseLeave={() => this.setState({imgType:''})}  
          className={"main-nav_icon-text d-flex align-items-center text-yellow"}>
            <img src={"images/nav-icon" + this.state.imgType + ".png"}  alt="" />
            <span>SGC MLM</span>
          </a>
            <Mainnav text={_t('SGC Shop')} link='sgc' />
            <Mainnav text={_t('Community')} link='community' />
            <Mainnav text={_t('Clan')} link='clan' />
            <div className="gradient-line"></div>
            <div className="menu-toggle cross" onClick={(e)=> this.openMenu(e)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {isDesktop ? 
              ''
            :
              <NavLink className={"noticeAndNews"} to="noticeAndNews?id=01">{_t('Notice & News')}</NavLink>
            
            }
          </nav>
          <div className="menu-toggle" onClick={(e)=>this.openMenu(e)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="main-nav_right d-flex flex-column">
            <div className="price-language d-flex align-items-center">
              {this.props.userdata && 
                <div className="price d-flex align-items-center withdraw-lable" onClick={(e)=>this.openWithdraw(e)}>
                  <span>{_t('Withdraw')}</span>
                </div>
              }
              <div className="price d-flex align-items-center">
                <img src="images/sgc-coin-navbar.png" alt="" />
                <span>1 SGC = 1 USD</span>
              </div>
              <select name="" id="" className="language text-white" onChange={this.change} value={lang}>
                <option value="eng">ENG</option>
                <option value="ko">KOR</option>
                <option value="zh">CHI</option>
                <option value="ja">JAP</option>
              </select>
            </div>
            <div className="news-login d-flex"  >
              {isDesktop && isValidNoti? 
                <NavLink  to="noticeAndNews?id=01">{_t('Notice & News')}</NavLink>
              :
                ''
              }
              {this.props.userdata ? 
                <>
                <span className="profile-pic-and-name align-items-center line-height-normal">
                  <img src={this.props.userdata.avatarurl} alt="" />
                  <span>{this.props.userdata.displayname}</span>
                </span>
                <NavLink to="login" style={{paddingLeft: "10px"}}>{_t('Logout')}</NavLink>
                </>
              :
              <>
                <NavLink to="signup">{_t('Register')}</NavLink><span> / </span><NavLink to="login">{_t('Login')}</NavLink>
              </>

              }
            </div>
            <img src="images/search-icon.png" alt="" className="search" />
			    </div>
          <div className="modal-wrapper modal-withdraw">
            <div className="modal p-relative">
              <div className="dismiss text-yellow" onClick={(e)=>this.closeModal()}>×</div> 
              <slot></slot> 
              <span className="amount font-bold text-yellow has-half-underline p-relative">
                <span></span> 
                <span>{_t('Withdraw')}</span>
              </span>

              <Field type='text' className="withdraw" placeholder={_t('Enter Address')} name="address" value={this.state.address} onChange={this.changeInput} />
              <Field type='text' className="withdraw" placeholder={_t('Amount')} name="amount" value={this.state.amount} onChange={this.changeInput} />
              {this.state.disable ?
                <BtnDiamond text={_t('Withdraw')} className="disable"/>
              :
                <BtnDiamond text={_t('Withdraw')} onClick={this.Withdraw}/>
              }
            </div>
          </div>
		    </header>
        </div>
        </>
      );
    }
  }

// function mapStateToProp(state) {
//     return ({
//       userdata:state.headerData.userdata
//     })
// }
// function mapDispatchToProp(dispatch) {
//     return ({
//       changeUserData:(val)=>{dispatch(changeUserData(val))}
//     })
// }

// export default connect(mapStateToProp, null)(Header);
export default Header