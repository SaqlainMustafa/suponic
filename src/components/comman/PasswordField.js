import React from 'react';
import { NavLink } from 'react-router-dom';
import { _t, setLanguage } from '../../shared/translation';
class PasswordField extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
          type:'password'
      }
      
    }
  
    togglePasswordVisibility(){
     		if (this.state.type === 'password'){
                 this.setState({
                    type : 'text'
                 })
             }
			else{
                this.setState({
                    type : 'password'
                 })
            } 
    }
  
    render() {
        let lang = window.localStorage.getItem('lang');
        if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
        setLanguage(lang)
      return (
        <div className="pw-wrapper p-relative">
            <input type={this.state.type} name={this.props.name} id="" onChange={this.props.onChange} className={"text-white w-100 field "+this.props.className} placeholder={this.props.placeholder} />
            {this.props.showForgot && (
                <NavLink to="/forgot" className='forgot-pw text-muted form-text tdn'>{_t('Forgot Password')}</NavLink>
            )}
            <img src="images/eye-icon.png" alt="" className="toggle-pw-visibility" onClick={(e)=> this.togglePasswordVisibility()} />
        </div>
      );
    }
  }

export default PasswordField;