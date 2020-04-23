import React, { Component } from 'react';
import {  Route, Switch, BrowserRouter,Redirect } from 'react-router-dom';
// import './App.css';
// import Header from './components/common/Header'; // Common header
import Footer from './components/comman/Footer'; // Common footer
import IndexPage from './components/index/IndexPage';
import GameScreen from './components/GameScreen/GameScreen';
import SGC from './components/sgc/SGC';
import NoticeAndNews from './components/noticeAndNews/NoticeAndNews';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Forgot from './components/Forgot/Forgot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './commanStyle.css';
import 'font-awesome/css/font-awesome.min.css';

// import axios from 'axios';
// import detectBrowserLanguage from 'detect-browser-language'
// import $ from 'jquery';
// const lan=detectBrowserLanguage();
// var language=lan.split('-')[0];

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      browserCheckFlag : false
    }
  }
  
  componentDidMount() {
   
  }
  componentWillUpdate(prevProps){
    const locationChanged = this.props.location !== prevProps.location;
    console.log("Check this prevProps ---->", locationChanged)
  }
  componentDidUpdate(prevProps) {
    // will be true
    const locationChanged = this.props.location !== prevProps.location;
    console.log("Check this ---->", locationChanged)
   }
  render() {
    // let lang = language;
		// if (lang == undefined || lang == null) { lang = 'en' }
  
    return (
      <div>
        {/* {this.state.browserCheckFlag == true ?  <BrowserCheck /> : ''} */}
        <div className="main-wrapper">
          <BrowserRouter>
          <ToastContainer />
            <Switch>
              <div style={{paddingBottom: "30px"}}>
                <Route path="/signup" component={Signup} /> 
                <Route path="/login" component={Login} />
                <Route path="/forgot" component={Forgot} />
                <Route exact path="/home" component={IndexPage} />
                <Route exact path="/" >
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/community" >
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/clan" >
                  <Redirect to="/home" />
                </Route>
                <Route path="/noticeAndNews" component={NoticeAndNews} />
                <Route path="/game" component={GameScreen} />
                <PrivateRoute exact Route path="/sgc" component={SGC} />
                {/* <Route path="/sgc" component={SGC} /> */}
                {/*<Route path="/404error" component={Error_page} />
                <Route path="/coming-soon" component={Coming_soon} />
                <Route path="/deposit" component={Deposit} />
                <Route path="/order-history" component={OrderHistory} />
                <Route path="/transaction" component={TransactionSearch} />
                <Route path="/my-account" component={MyAccount} />
                <Route path="*" component={Error404} /> */}
              </div>
            </Switch>
          <Footer />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
      <Route
          {...rest}
          render={props =>
              localStorage.getItem('token') ? (<div>
                         <Component {...props} />
                  </div>
              ) : (
                  <Redirect
                      to={{
                          pathname: '/login',
                          state: { from: props.location },
                      }}
                  />
              )
          }
      />
  );
}


export default App;
