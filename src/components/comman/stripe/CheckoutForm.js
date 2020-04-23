import React from 'react';
import {  CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe } from 'react-stripe-elements';
 
import BtnDiamond from '../../comman/BtnDiamond';
import './CheckoutForm.css'
// import Field from '../../comman/Field';

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            amount: '',
            email: '',
        };
        this._elementCard = React.createRef();
        this._elementExp = React.createRef();
        this._elementcvv = React.createRef();
        this.submit = this.submit.bind(this);
        this.changeInput = this.changeInput.bind(this)
    }

    changeInput = (event) => {
        this.setState({
            email: event.target.value
        });
    }
    async submit(ev) {
        let { token } = await this.props.stripe.createToken({ name: this.state.email }, (error) => {
            console.log('error',error)
        });
        console.log('token',token);
        if (token && this.props.amount.length !== 0) {
            this._elementCard.current._element.clear()
            this._elementExp.current._element.clear()
            this._elementcvv.current._element.clear()
            this.props.depositUSD(token, {amount:this.props.amount,email:this.state.email})
            this.setState({ amount: '', email: '' })
            token = undefined
        }
    }
    render() {
        return (
            <div>
                    <div className="stripe_checkout">
                        <div className="stripe_card_number">
                            <CardNumberElement ref={this._elementCard} />
                        </div>
                        <div className="stripe_card_name">
                            <input type="text" placeholder="Card Holder Email" name="email" value={this.state.email} onChange={this.changeInput} />
                        </div>
                        <div className="stripe_expiry">
                            <CardExpiryElement ref={this._elementExp} />
                        </div>
                        <div className="stripe_cvv">
                            <CardCvcElement ref={this._elementcvv} />
                        </div>
                    </div>
                    <div className="copy">
                        <BtnDiamond text={"Pay $"+this.props.amount +" with Card"} onClick={this.submit}/>
                    </div>
                </div>
        );
    }
}
 
export default injectStripe(CheckoutForm);