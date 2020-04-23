import React from "react";
import moment from "moment";
import Services from "../../shared/Services.js";
import constant from "../../utils/constant.js";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import { StripeProvider, Elements } from "react-stripe-elements";
//import BtnDiamond from '../comman/BtnDiamond';
import SgcCard from "../comman/SgcCard";
import Header from "../comman/Header";
// import Field from '../comman/Field';
import InjectedCheckoutForm from "../comman/stripe/CheckoutForm";
// const stripePromise = loadStripe(constant.REACT_APP_STRIPE_KEY);
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { changeUserData } from "../../redux/actions/index";
import { _t, setLanguage } from "../../shared/translation";
class SGC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      pageLoaded: true,
      amount: "",
      token: "",
      ggpRange: 10,
      copied: false,
      ggp_histories: [],
      noOfPackage1: 1,
      noOfPackage5: 1,
      noOfPackage10: 1,
      openToolTipBoxId: "",
      userdata: JSON.parse(localStorage.getItem("userdata")),
      isDesktop: false,
    };

    setTimeout(() => {
      this.setState({ pageLoaded: false });
    }, 300);
    this.services = new Services();
    this.depositUSD = this.depositUSD.bind(this);
    this.copyText = this.copyText.bind(this);
    this.showModal = this.showModal.bind(this);
    this.ggpHistory = this.ggpHistory.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.ggpHistory(this.state.ggpRange);
    this.handlePackage = this.handlePackage.bind(this);
    this.change = this.change.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  closeModal() {
    var modal = document.querySelector(".modal-purchase");
    modal.style.display = "none";
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log("[token]", payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  depositUSD(token, d) {
    let data = {
      // type: 'CARD',
      amount: d.amount * 100,
      stripeEmail: d.email,
      stripeToken: token.id,
      userid: parseInt(this.state.userdata.id),
      // type: 'CARD',
      // amount: d.amount,
      // card_token: token.id
    };
    this.setState({ amount: d.amount, token: token });
    console.log("data", data);
    let url = "/webhook/stripecharge";
    this.services.stripecharge(data, url, (res) => {
      console.log("stripecharge response", res);
      if (res.status === 200) {
        this.services.successToast("successfully!");
        this.ggpHistory(this.state.ggpRange);
        this.closeModal();
      } else {
        this.services.errorToast(res.error_description);
      }
    });
  }
  showModal(amount) {
    var modal = document.querySelector(".modal-purchase");
    modal.style.display = "block";
    this.setState({ amount: amount });
    // modal.querySelector('.btn-diamond').textContent = `Pay with Card $${this.props.amount}`;
    // modal.querySelector('.amount span:first-child').textContent = this.props.amount
  }
  editProfile() {
    console.log("Edit profile");
  }
  ggpHistory(ggpRange) {
    let url = "/transactions/ggp-history?range=" + ggpRange;
    this.services.ggpHistory(url, (res) => {
      console.log("ggpHistory", res);
      if (res.status === 200) {
        this.setState({
          total_count: res.data.total_count,
          ggp_histories: res.data.ggp_histories,
        });
        this.getUserDetails();
      } else {
      }
    });
  }

  getUserDetails() {
    let url = "/profile/basicinfo";
    this.services.basicinfo(url, (res) => {
      console.log("userDetails", res);
      if (res.status === 200) {
        this.setState({
          // loggedIn:true,
          userDetails: res.data,
          userdata: res.data,
        });
        localStorage.setItem("userdata", JSON.stringify(res.data));
      } else {
      }
    });
  }
  copyText() {
    this.setState({ openToolTipBoxId: "" });
    this.services.successToast("Copied!");
  }
  change(event) {
    this.setState({ ggpRange: event.target.value });
    this.ggpHistory(event.target.value);
  }
  handlePackage(e) {
    e.preventDefault();
    if (e.target.name === "package1") {
      this.setState({ noOfPackage1: e.target.value });
    } else if (e.target.name === "package5") {
      this.setState({ noOfPackage5: e.target.value });
    } else {
      this.setState({ noOfPackage10: e.target.value });
    }
  }
  openToolTip(e, data) {
    if (Number.isInteger(this.state.openToolTipBoxId)) {
      if (this.state.openToolTipBoxId == data) {
        this.setState({ openToolTipBoxId: false });
      } else {
        this.setState({ openToolTipBoxId: data });
      }
    } else {
      this.setState({ openToolTipBoxId: data });
    }
    // this.services.successToast(data.pool_details.pool_id + " "+ data.pool_details.description);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 767.98 });
  }

  currentBalance=(index)=>{
    
    let amount = 0
    let balance = 0
    if (this.state.ggp_histories.length>0 && this.state.userDetails&& this.state.userDetails.gems) {
      for (let i = 0; i <= index; i++) {
        amount =amount + this.state.ggp_histories[i].amount; 
        // console.log(amount,"amount",this.state.ggp_histories[i].amount);
      }
      balance=this.state.userDetails.gems - amount;
      return parseFloat(balance).toFixed(2);
    }else 
      return null
    
  }
    
    

  render() {
    
    let lang = window.localStorage.getItem("lang");
    const isDesktop = this.state.isDesktop;
    if (lang === undefined || lang === null || lang === "null") {
      lang = "eng";
    }
    setLanguage(lang);
    let openToolTipBoxId = this.state.openToolTipBoxId;
    return (
      <div id="app">
        <Header userdata={this.state.userdata} />
        <section
          className={
            isDesktop
              ? "sgc-shop container d-flex flex-column align-items-center"
              : "sgc-shop container flex-column align-items-center"
          }
        >
          {this.state.pageLoaded ? (
            <div name="fade" className="text-center grid-col-span text-white">
              <div
                id="preloader-wrapper"
                style={{ position: "relative", backgroundColor: "transparent" }}
              >
                <img src="images/preloader.svg" alt="" className="preloader" />
              </div>
            </div>
          ) : (
            <>
              <div className="user-pic-and-name d-flex flex-column align-items-center">
                <img
                  src="images/profile-icon.png"
                  alt=""
                  className="profile-pic"
                />
                <h5 className="name text-white font-bold">
                  {this.state.userdata ? this.state.userdata.displayname : ""}
                  <img
                    src="images/edit-icon.png"
                    alt=""
                    onClick={(e) => this.editProfile()}
                    className="edit"
                  />
                </h5>
              </div>
              <div className="coin-and-amount d-flex align-items-center">
                <img src="images/coin-avail-icon.png" alt="" />
                <span className="amount text-white font-bold">
                  {this.state.userdata ? this.state.userdata.gems : ""}{" "}
                  <span className="text-yellow">SGC</span>
                </span>
              </div>
              <div className="sgc-cards d-grid">
                <SgcCard
                  amount="1"
                  name="package1"
                  onClick={(e) => this.showModal(1 * this.state.noOfPackage1)}
                  onChange={this.handlePackage}
                  value={this.state.noOfPackage1}
                />
                <SgcCard
                  amount="5"
                  name="package5"
                  onClick={(e) => this.showModal(5 * this.state.noOfPackage5)}
                  onChange={this.handlePackage}
                  value={this.state.noOfPackage5}
                />
                <SgcCard
                  amount="10"
                  name="package10"
                  onClick={(e) => this.showModal(10 * this.state.noOfPackage10)}
                  onChange={this.handlePackage}
                  value={this.state.noOfPackage10}
                />
                <div className="address-wrapper text-center grid-col-span">
                  <p className="text-muted info">
                    If you have SGC elsewhere (for example on the Suponic
                    Exchange), you can deposit them to the game by sending SGC
                    to the address:
                  </p>
                  <p className="address text-white">
                    {this.state.userdata
                      ? this.state.userdata.ggpethaddress
                      : ""}
                    <CopyToClipboard
                      text={
                        this.state.userdata
                          ? this.state.userdata.ggpethaddress
                          : ""
                      }
                      onCopy={this.copyText}
                    >
                      <img
                        src="images/copy-icon.png"
                        alt=""
                        style={{ cursor: "pointer" }}
                        className="copy"
                      />
                    </CopyToClipboard>
                  </p>
                </div>
              </div>
              {/* <div className="history grid-col-span">
                    <h5 className="font-bold text-white">SGC {_t('History')}</h5>
                    <select style={{float:'right', margin: '5px 0px'}} name="" id="" className="language " onChange={this.change} value={this.state.ggpRange}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                    </select>
                    <table className="table-history text-white">
                      <thead>
                        <tr className="font-bold">
                          <th>Date</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Game</th>
                          <th>Participants</th>
                          <th>Start time</th>
                          <th>End time</th>
                        </tr>
                      </thead>
                      <tbody>

                  
                        {this.state.ggp_histories.map((data,key)=>{
                          return(
                            <tr key={key} className= {openToolTipBoxId === key ? "tooltip active" : "tooltip"} onClick={(e)=>this.openToolTip(e,key)} style={{cursor: "pointer"}}>
                              

                              <td>{moment(data.issue_date).format('DD-MM-YYYY')} 
                                {data.pool_details &&
                                (
                                  <span className="tooltiptext " >
                                    <span className="yelloTxt"> Pool ID: </span> {data.pool_details.pool_id}  <span className="yelloTxt"> Description: </span> {data.pool_details.description} 
                                    <CopyToClipboard text={ "Pool ID: "+ data.pool_details.pool_id +" Description: " +data.pool_details.description} onCopy={this.copyText}>
                                      <img src="images/copy-icon.png" alt="" style={{cursor:"pointer",width: "4%",marginLeft: "11px"}} className="copy" />
                                    </CopyToClipboard> 
                                  </span>

                                )}
                              </td>
                              <td>{data.type}</td>
                              {data.amount<=0 
                              ? 
                              <td style={{color:'red',fontWeight: '600'}}>{data.amount} SGC</td>
                              :
                              <td style={{color:'green',fontWeight: '600'}}>{data.amount} SGC</td>
                              }
                              <td>{data.game}</td>
                              <td>{data.participants.map((d,k)=>{return d.display_name}).join(",")}</td>
                              <td>{data.pool_details && data.pool_details.start_time ? moment(data.pool_details.start_time).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}</td>
                              <td>{data.pool_details && data.pool_details.end_time ? moment(data.pool_details.end_time).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}</td>
                            </tr>
                          )

                        })}
                        {this.state.ggp_histories.length===0 && 
                        <>  
                          <tr>
                            <td colSpan="7" style={{textAlign: 'center'}}>There is no SGC</td>  
                          </tr>
                        </>}
                      </tbody>
                    </table>
                </div> */}
            </>
          )}

          <div className="history grid-col-span" style={{ overflowX: "auto" }}>
            <table className="table-history text-white">
              <thead>
                <tr className="font-bold">
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance After</th>
                  <th>Game</th>
                  <th>Participants</th>
                  <th>Start time</th>
                  <th>End time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ggp_histories.map((data, key) => {
                  return (
                    <tr
                      key={key}
                      className={
                        openToolTipBoxId === key ? "tooltip active" : "tooltip"
                      }
                      onClick={(e) => this.openToolTip(e, key)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        {moment(data.issue_date).format("DD-MM-YYYY")}
                        {data.pool_details && (
                          <span className="tooltiptext ">
                            <span className="yelloTxt"> Pool ID: </span>{" "}
                            {data.pool_details.pool_id}{" "}
                            <span className="yelloTxt"> Description: </span>{" "}
                            {data.pool_details.description}
                            <CopyToClipboard
                              text={
                                "Pool ID: " +
                                data.pool_details.pool_id +
                                " Description: " +
                                data.pool_details.description
                              }
                              onCopy={this.copyText}
                            >
                              <img
                                src="images/copy-icon.png"
                                alt=""
                                style={{
                                  cursor: "pointer",
                                  width: "4%",
                                  marginLeft: "11px",
                                }}
                                className="copy"
                              />
                            </CopyToClipboard>
                          </span>
                        )}
                      </td>
                      <td>{data.type}</td>
                      {data.amount <= 0 ? (
                        <td style={{ color: "red", fontWeight: "600" }}>
                          {data.amount} SGC
                        </td>
                      ) : (
                        <td style={{ color: "green", fontWeight: "600" }}>
                          {data.amount} SGC
                        </td>
                      )}
                      {/* edit here ..................*/}
                      <td>
                       {key===0? this.state.userdata && 
                       this.state.userdata.gems:this.currentBalance((key - 1))}
                      </td>

                      <td>{data.game}</td>
                      <td>
                        {data.participants
                          .map((d, k) => {
                            return d.display_name;
                          })
                          .join(",")}
                      </td>
                      <td>
                        {data.pool_details && data.pool_details.start_time
                          ? moment(data.pool_details.start_time).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : "N/A"}
                      </td>
                      <td>
                        {data.pool_details && data.pool_details.end_time
                          ? moment(data.pool_details.end_time).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
                {this.state.ggp_histories.length === 0 && (
                  <>
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        There is no SGC
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="modal-wrapper modal-purchase">
          <div className="modal p-relative">
            <div
              className="dismiss text-yellow"
              onClick={(e) => this.closeModal()}
            >
              ×
            </div>
            <h4 className="title text-white font-bold">
              {this.state.userdata ? this.state.userdata.displayname : ""}
            </h4>

            <slot></slot>
            <span className="amount font-bold text-yellow has-half-underline p-relative">
              <span></span>
              <span>{this.state.amount} SGC</span>
            </span>
            {/* <form action="" className="sgc-form">
                <Field type='Email' placeholder='Email' />
                <Field type='number' placeholder='Card Number' />
                <div className="date-and-cvc d-flex">
                  <Field type='date' placeholder='MM/YY' />
                  <Field type='number' placeholder='CVC' />
                </div>
                <remember-me></remember-me>
                <BtnDiamond text="" />
              </form> */}

            {/* <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements> */}
            <StripeProvider apiKey={constant.REACT_APP_STRIPE_KEY}>
              <Elements>
                <InjectedCheckoutForm
                  depositUSD={this.depositUSD}
                  amount={this.state.amount}
                />
              </Elements>
            </StripeProvider>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    userdata: state.headerData.userdata,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    changeUserData: (val) => {
      dispatch(changeUserData(val));
    },
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(SGC);
