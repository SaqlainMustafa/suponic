import React from 'react';
import Services from '../../shared/Services.js';
import Header from '../comman/Header';
import Field from '../comman/Field';
import PasswordField from '../comman/PasswordField';
import BtnDiamond from '../comman/BtnDiamond';
import { NavLink } from 'react-router-dom';
// import SimpleReactValidator from 'simple-react-validator';
import CustomValidator from "../comman/customvalidate.js";


import { connect } from "react-redux";
import { changeUserData } from '../../redux/actions/index';
import { _t, setLanguage } from '../../shared/translation';

class Forgot extends React.Component {
    constructor(props) {
      super(props);

    this.validator = new CustomValidator([
        {
          field: "email",
          method: "isEmpty",
          validWhen: false,
          message: "Email is required."
        }
    ]);
    this.validatorReset = new CustomValidator([
        {
            field: "code",
            method: "isEmpty",
            validWhen: false,
            message: "Code is required."
        },
        {
            field:'password',
            method:'isEmpty',
            validWhen:false,
            message:'Password is required.'
        },
        {
            field:'Cpassword',
            method:'isEmpty',
            validWhen:false,
            message:'Confirm Password is required.'
        }
    ]);

      this.state ={
        loggedIn:true,
        pageLoaded:false,
        email:'',
        code:'',
        password:'',
        Cpassword:'',
        resetPassword:false,
        validation: this.validator.valid(),
        validattionReset:this.validatorReset.valid()
      }
      this.submitted = false;
      this.submitRest=false;
      this.services = new Services();

     

        this.forgot=this.forgot.bind(this);
        this.reset=this.reset.bind(this);
        this.changeInput=this.changeInput.bind(this);
     
    }
  
    
    forgot(){
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        console.log('validation',validation);
        if (validation.isValid) {
            let url = '/user/trigger-reset-password'
            var data=this.state.email
            
            this.services.forgot(data,url,(res)=>{
                console.log('forgot response',res);
                if(res.status===200){
                    this.setState({resetPassword:true});
                   this.services.successToast("Reset password code send to your email!");
                }
                else{
                    this.services.errorToast(res.error_description)
                }
            })
        }
        else{
            this.services.errorToast("Fields are not valid!");
        }
    }

    reset(){
        const validattionReset= this.validatorReset.validate(this.state);

        this.setState({ validattionReset });
        this.submitRest = true;
        console.log('validation',validattionReset);
        if (validattionReset.isValid) {
            if(this.state.password !== this.state.Cpassword){
                this.services.errorToast("Password and confirm password not match!");
                return
            }
            let url = '/user/reset-password?resetpasscode='+this.state.code
            var data=this.state.password
            
            this.services.forgot(data,url,(res)=>{
                console.log('forgot response',res);
                if(res.status===200){
                    this.services.successToast("password changed successfully!");
                    this.props.history.push('/login');
                }
                else{
                    this.services.errorToast(res.error_description)
                }
            })
        }
        else{
            this.services.errorToast("Fields are not valid!");
        }

        
    }
    
    changeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let lang = window.localStorage.getItem('lang');
        if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
        setLanguage(lang)
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation; 
        let resetValidation=this.submitRest ? this.validatorReset.validate(this.state) : this.state.validattionReset;
        // this.validator.purgeFields();
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

            {this.state.resetPassword ? 
                // ResetPassword
                <section className="login-signup container d-flex align-items-center p-relative">
                    <img src="images/main-banner-vfx.png" alt="" className="bg"/>
                    <div className="text">
                        <h1 className="title text-white has-half-underline font-bold">{_t('Login with Suponic Games and Play new and exciting games win SGC')}
                        </h1>
                        <p className="text-small text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam et doloribus
                            molestias, porro cumque natus corrupti beatae id quos possimus. Aspernatur iste hic numquam, consectetur
                            laboriosam perspiciatis ab illo eveniet?</p>
                        <p className="text-small text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti non illum
                            nam dolorem atque praesentium numquam aliquam veritatis magnam debitis?</p>
                    </div>
                    <form action="" className="login-signup-form login-form d-flex flex-column">
                        <Field type='text' placeholder={_t('Code')} name="code" className={resetValidation.code.isInvalid?'is-invalid-input':''}  onChange={this.changeInput} />
                        <span className="text-danger">{resetValidation.code.message}</span>
                        <PasswordField placeholder='Password' className={resetValidation.password.isInvalid?'is-invalid-input':''} name="password" onChange={this.changeInput} />
                        <span className="text-danger">{resetValidation.password.message}</span>
                        <PasswordField placeholder='Conform Password' className={resetValidation.Cpassword.isInvalid?'is-invalid-input':''} name="Cpassword" onChange={this.changeInput} />
                        <span className="text-danger">{resetValidation.Cpassword.message}</span>
                        <div className="d-flex justify-content-between remember-and-new">
                            <remember-me></remember-me>
                            <NavLink to="/signup" className="text-muted new form-text tdn">{_t('New to Suponic Games?')}</NavLink>
                        </div>
                        <BtnDiamond text={_t('Reset Password')} onClick={this.reset}/>
                        <NavLink to="/" className="back tdn text-white font-bold d-flex form-text"><img src="images/back-icon.png" alt=""/> {_t('back to')} <span className="text-yellow">Suponic</span>Games</NavLink>
                    </form>
                </section>
            :
                // Forgot Password
                <section className="login-signup container d-flex align-items-center p-relative">
                    <img src="images/main-banner-vfx.png" alt="" className="bg"/>
                    <div className="text">
                        <h1 className="title text-white has-half-underline font-bold">{_t('Login with Suponic Games and Play new and exciting games win SGC')}
                        </h1>
                        <p className="text-small text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam et doloribus
                            molestias, porro cumque natus corrupti beatae id quos possimus. Aspernatur iste hic numquam, consectetur
                            laboriosam perspiciatis ab illo eveniet?</p>
                        <p className="text-small text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti non illum
                            nam dolorem atque praesentium numquam aliquam veritatis magnam debitis?</p>
                    </div>
                    <form action="" className="login-signup-form login-form d-flex flex-column">
                        <Field type='text' placeholder={_t('Email')} name="email" className={validation.email.isInvalid?'is-invalid-input':''}  onChange={this.changeInput} />
                        <span className="text-danger">{validation.email.message}</span>
                        <div className="d-flex justify-content-between remember-and-new">
                            <remember-me></remember-me>
                            <NavLink to="/signup" className="text-muted new form-text tdn">{_t('New to Suponic Games?')}</NavLink>
                        </div>
                        <BtnDiamond text={_t('Forgot Password')} onClick={this.forgot}/>
                        <NavLink to="/" className="back tdn text-white font-bold d-flex form-text"><img src="images/back-icon.png" alt=""/> {_t('back to')} <span className="text-yellow">Suponic</span>Games</NavLink>
                    </form>
                </section>
            }
            
            
        </div>
      );
    }
}

// function mapDispatchToProp(dispatch) {
//     return ({
//       changeUserData:(val)=>{dispatch(changeUserData(val))}
//     })
//   }
  
// export default connect(null, null)(Forgot);
export default Forgot;