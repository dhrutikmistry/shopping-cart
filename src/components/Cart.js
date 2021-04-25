
import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {removeFromCart} from '../actions/cartActions';
import {createOrder, clearOrder, fetchOrders} from '../actions/orderActions';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state ={
            showCheckout: false,
            name:"",
            email:"",
            address:"",
        }
    }
   // componentWillMount() {
    //   this.props.fetchOrders();
    //}
    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    handleClick = () => {
        //const {showCheckout} = this.props;
        this.setState({showCheckout: true});
        console.log("showcheckout="+this.state.showCheckout);
    }
    createOrder = (e) => {
        console.log("In create order");
        e.preventDefault();
        const order={
            email:this.state.email,
            name:this.state.name,
            address:this.state.address,
            cartItems:this.props.cartItems.length,
            total:this.props.cartItems.reduce((a,c) => a + c.price*c.count,0),
        }
        this.props.createOrder(order);
    }
    closeModal = () => {
        this.props.clearOrder();
        }
    render(){
       // const {showCheckout} = this.props;
        return(
            <div>
                {this.props.cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is empty</div>
                ) : (
                <div className="cart cart-header">
                     You have {this.props.cartItems.length} in the cart{" "}
                </div>
                )}
               
                <div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                        {this.props.cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                        <button className="button" onClick={()=>this.props.removeFromCart(item)}>Remove</button>
                                        
                                    </div>
                                    
                                </div>
                            </li>
                        ))}
                     </ul> 
                     </Fade>          
                </div>
              </div>
              {this.props.cartItems.length !== 0 && (
                <div>    
                <div className="cart">
                    <div className="total">
                        <div>
                        Total: {" "}
                        {formatCurrency(this.props.cartItems.reduce((a,c)=> a + c.price*c.count ,0))}
                        </div>
                        
                        <button onClick={()=>this.handleClick()} className="button primary">Proceed</button>
                    </div>
                </div>
                </div>
              )} 
             {this.state.showCheckout && (
                    <Fade right cascade>
                    <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input name="email" type="email" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Name</label>
                                <input name="name" type="text" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>Address</label>
                                <input name="address" type="text" required onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <button className="button primary" type="submit" >Checkout</button>
                            </li>
                        </ul>

                    </form>
                    </div>
                    </Fade>
                  )}
                  </div>
                  )}     
  }


const mapStateToProps = (state) =>{
    return {
        cartItems: state.cart.cartItems,
        order: state.order.orders,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        removeFromCart : (product) => dispatch(removeFromCart(product)),
        createOrder : (order) => dispatch(createOrder(order)),
        clearOrder : () => dispatch(clearOrder()),
        fetchOrders : () => dispatch(fetchOrders()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);





