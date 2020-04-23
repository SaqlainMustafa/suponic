import React from 'react';
import Services from '../../shared/Services.js';
import Header from '../comman/Header';
import Field from '../comman/Field';
import PasswordField from '../comman/PasswordField';
import BtnDiamond from '../comman/BtnDiamond';
import { NavLink } from 'react-router-dom';
// import validator from 'validator';
import { _t, setLanguage } from '../../shared/translation';
import CustomValidator from "../comman/customvalidate.js";

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.validator = new CustomValidator([
        {
          field: "username",
          method: "isEmpty",
          validWhen: false,
          message: "Username is required."
        },
        {
          field: "password",
          method: "isEmpty",
          validWhen: false,
          message: "Password is required."
        },
        {
          field: "email",
          method: "isEmpty",
          validWhen: false,
          message: "Email is required."
        },
        // {
        //   field: "email",
        //   method: "isEmpty",
        //   validWhen: true,
        //   message: "Email is not valid."
        // },
        {
          field: "cPassword",
          method: "isEmpty",
          validWhen: false,
          message: "Confirm Password is required."
        }
    ]);

      this.state ={
        loggedIn:true,
        pageLoaded:false,
        username:'',
        email:'',
        password:'',
        cPassword:'',
        isLoading : false,
        validation: this.validator.valid()
      }
      
      this.services = new Services();
      this.changeInput=this.changeInput.bind(this);
      this.Signup=this.Signup.bind(this);
    }
    
    changeInput(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    Signup(){
      const validation = this.validator.validate(this.state);
      this.setState({isLoading:true});
      this.setState({ validation });
      this.submitted = true;
      if (validation.isValid) {
      let url="/Auth/register";
      var data={
        username:this.state.username,
        email:this.state.email,
        password:this.state.password,
        "sponsor": ""
      }
      console.log('data',data);
      this.services.signup(data,url,(res)=>{
        console.log('signup',res);
        if(res.status===200){
          this.services.successToast("Register successfully!");
          this.props.history.push('/login');
        }
        else{
          this.services.errorToast(res.error)
        }
      })
      }
      else{
        this.services.errorToast("Fields are not valid!");
       }
        setTimeout(() => {
         this.setState({isLoading:false});
       }, 1000);
    }  
  
    render() {
      let lang = window.localStorage.getItem('lang');
      if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
      setLanguage(lang)

      let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation; 
      return (
        <div id="app">
             {this.state.pageLoaded && 
                <div name='fade'>
                  <div id="preloader-wrapper">
                    <img src="images/preloader.svg" alt="" className="preloader" />
                  </div>
                </div>
            }
            <Header loggedIn={this.state.loggedIn} />
            <section className="login-signup container d-flex align-items-center p-relative">
                <img src="images/main-banner-vfx.png" alt="" className="bg" />
                <div className="text">
                    <h1 className="title text-white has-half-underline font-bold">{_t('Register to Suponic Game and Earn to Play with Friends Competitors')}
                    </h1>
                    <p className="text-small text-muted">{_t('SGC stands for Suponic Game Coin, the crypto currency used in the Suponic Game Platform.')}</p>
                    <p className="text-small text-muted">{_t('Use the SGC you received from the registration to play wagering mode against other players. You can receive 5 SGC for free if you create the SGC Wallet and completes the KYC. SGC will be listed to the Supoinc Exchange in May 1, 2020, at the price of $1.')}</p>
                </div>
                <form action="" className="login-signup-form signup-form d-flex flex-column">
                    <Field type="text" placeholder={_t('Username')} className={validation.username.isInvalid?'is-invalid-input':''} name="username" onChange={this.changeInput} />
                    <span className="text-danger">{validation.username.message}</span>
                    <Field type='email' placeholder={_t('Email')} className={validation.email.isInvalid?'is-invalid-input':''} name="email" onChange={this.changeInput} />
                    <span className="text-danger">{validation.email.message}</span>
                    <PasswordField placeholder={_t('Password')} className={validation.password.isInvalid?'is-invalid-input':''} name="password" onChange={this.changeInput} />
                    <span className="text-danger">{validation.password.message}</span>
                    <p className="field-info text-muted form-text">{_t('Password must be more than 6 characters in length and contain at least one letter and one number')}</p>
                    <PasswordField placeholder={_t('Confirm Password')} className={validation.cPassword.isInvalid?'is-invalid-input':''} name="cPassword" onChange={this.changeInput} />
                    <span className="text-danger">{validation.cPassword.message}</span>
                    <p className="field-info text-muted form-text">{_t('Please enter the password you entered above once more')}</p>
                  <div style={{position:"relative",left:"24px"}}>
                    <BtnDiamond text='Register' onClick={this.Signup} style={{margin:"auto"}} disabled={this.state.isLoading? true: false} />
                    {this.state.isLoading? 
                        <span style={{position:"absolute",right:"40px",top:"48%",transform:"translateY(-50%)",color:"#fff"}}> <i className="fa fa-spinner fa-spin"></i></span> : ""}
                    </div>
                    <NavLink to="/login" className="form-text text-muted tdn text-center">{_t('Already have an account?')}</NavLink>
                    <NavLink to="/forgot" className="form-text text-muted tdn text-center">{_t('Forgot Password?')}</NavLink>
                    <NavLink to="/" className="back tdn text-white font-bold d-flex form-text"><img src="images/back-icon.png" alt=""/> {_t('back to')} <span className="text-yellow">Suponic</span>Games</NavLink>
                </form>
            </section>
           
        </div>
      );
    }
}

export default Signup;
