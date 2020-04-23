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
class Login extends React.Component {
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
        }
    ]);

      this.state ={
        loggedIn:true,
        pageLoaded:false,
        username:'',
        password:'',
        maxLength:8,
        isLoading:false,
        validation: this.validator.valid()
      }
      this.submitted = false;
      this.services = new Services();

     

    //   this.validator = new SimpleReactValidator({
    //     messages: {
    //         "username":"Username required!"
    //     }
    //   });
       this.login=this.login.bind(this);
      this.changeInput=this.changeInput.bind(this);
      this.props.changeUserData(false)
     
      localStorage.removeItem('token');
      localStorage.removeItem('userdata');
    }
  
    
    login(){
        const validation = this.validator.validate(this.state);
        this.setState({isLoading:true});
        this.setState({ validation });
        this.submitted = true;
        console.log('validation',validation);
        if (validation.isValid) {
            let url = '/auth/token'
            var data={
                "username":this.state.username,
                "password":this.state.password,
                "grant_type":"password",
                "client_id":1,
                "scope":"openid offline_access email"
            }
            this.services.login(data,url,(res)=>{
                console.log('login response',res);
                if(res.status===200){
                    this.services.successToast("Login successfully!");
                    localStorage.setItem('token',res.data.access_token);
                    var routeWas=localStorage.getItem('route');

                    console.log('routeWas',routeWas);
                    if(routeWas=="sgc"){
                      this.props.history.push('/sgc');
                    }
                    else{
                      this.props.history.push('/');
                    }
                    // console.log('this.state.allGames',this.state.allGames)
                }
                else{
                    this.services.errorToast(res.error_description)
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
    
    changeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let lang = window.localStorage.getItem('lang');
        if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
        setLanguage(lang)
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation; 
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
            <section className="login-signup container d-flex align-items-center p-relative">
                <img src="images/main-banner-vfx.png" alt="" className="bg"/>
                <div className="text">
                    <h1 className="title text-white has-half-underline font-bold">{_t('Login with Suponic Games and Play new and exciting games win SGC')}
                    </h1>
                    <p className="text-small text-muted">
                      {_t('SGC won from wagering can be exchanged at any time on the Suponic exchange, and its value can increase for the SGC holders.')}  </p>
                    <p className="text-small text-muted">{_t('You can become a millionaire just by playing well on the game freely provided by Suponic. Download “InkWars” from the download section inside the wallet. Play “InkWars” for free, enjoy it, practice it, and think of the strategies to win.')}</p>
                </div>
                <form action="" className="login-signup-form login-form d-flex flex-column">
                    <Field type='text' placeholder={_t('Username')} name="username" className={validation.username.isInvalid?'is-invalid-input':''}  onChange={this.changeInput} />
                    <span className="text-danger">{validation.username.message}</span>
                    <PasswordField showForgot='true' placeholder={_t('Password')}  className={validation.password.isInvalid?'is-invalid-input':''} name="password"  onChange={this.changeInput} />
                    <span className="text-danger">{validation.password.message}</span>
                    <div className="d-flex justify-content-between remember-and-new">
                        <remember-me></remember-me>
                        <NavLink to="/signup" className="text-muted new form-text tdn">{_t('New to Suponic Games?')}</NavLink>
                    </div>
                   
                    <div style={{position:"relative", left:"24px"}}>
                    <BtnDiamond text={_t('Login')} onClick={this.login} disabled={this.state.isLoading? true: false}/>
                    {this.state.isLoading? 
                        <span style={{position:"absolute",right:"40px",top:"77%",transform:"translateY(-50%)",color:"#fff"}}> <i className="fa fa-spinner fa-spin"></i></span> : ""}
                    </div>
                    <NavLink to="/" className="back tdn text-white font-bold d-flex form-text"><img src="images/back-icon.png" alt=""/> {_t('back to')} <span className="text-yellow">Suponic</span>Games</NavLink>
                </form>
            </section>
        </div>
      );
    }
}

function mapDispatchToProp(dispatch) {
    return ({
      changeUserData:(val)=>{dispatch(changeUserData(val))}
    })
  }
  
  export default connect(null, mapDispatchToProp)(Login);