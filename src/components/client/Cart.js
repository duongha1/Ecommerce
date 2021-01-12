import React, { Component } from 'react'
import {Container } from 'reactstrap';
import CommonQuantityInput from './CommonQuantityInput';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import axios from 'axios';
import API_CONSTANT from '../../assets/constant/api'
import {withRouter} from 'react-router-dom'

class CartProduct extends React.Component{
    state={
        quantity: 1
    }
    componentDidMount(){
        this.setState({
            quantity: this.props.product.quantity
        })
    }
    handdleChangeQuantity=(data, operator = false)=>{
        if(operator){ //if operator is true, the quantity is inputed from keyboards
            this.setState({
                quantity: data
            },()=>{
                this.props.updateCart(this.props.product.id_cart, this.state.quantity)
            })
        }else{
            this.setState({
                quantity: this.state.quantity + data
            }, ()=>{
                this.props.updateCart(this.props.product.id_cart, this.state.quantity)
            })
        }
    }
    handleDeleteCart=(event)=>{
        event.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteCart(this.props.product.id_cart);
              Swal.fire({
                title: "Your product has been deleted!",
                timer: 1200,
                showCancelButton: false,
                showConfirmButton: false,
                icon: 'success'
              })
            }
          }).catch(err => {
            Swal.fire({
                title: "Unsuccesfully",
                timer: 1000,
                icon: 'error'
            })
          })
    }
    render(){
        const {name,price, image} = this.props.product;
        return (
            <div className="cart-table-rows">
                    <div className="cart-table-cell">
                        <img src={image}  alt={name}/>
                        {name}
                    </div>
                    <div className="cart-table-cell">
                        {price}€
                    </div>
                    <div className="cart-table-cell">
                        <CommonQuantityInput onChange={this.handdleChangeQuantity} value={this.state.quantity}/>
                        <br></br>
                    </div>
                    <div className="cart-table-cell">
                        {price*this.state.quantity}€
                        <button className="btn-cart-product" onClick={this.handleDeleteCart}>Remove</button>
                    </div>
                </div>
        )
    }
}

class Cart extends Component {
    componentDidMount(){

    }
    handleCheckout=()=>{
        const token = window.localStorage.getItem('client_token');
        if(token){
            axios.post(`${API_CONSTANT.domain}/carts`,{
                ...this.props.cart
            },{
                headers: {token}
            }).then(res => {
                Swal.fire({
                    title: "Check out successful!",
                    timer: 1200,
                    showCancelButton: false,
                    showConfirmButton: false,
                    icon: 'success'
                  }).then(res=>{
                      this.props.clearCart()
                  })
            }).catch(err=>{
                Swal.fire({
                    title:"Checkout unsuccessfully",
                    text:"Something went wrong",
                    timer:2000,
                    showConfirmButton:false,
                    icon:'error',
                    timerProgressBar:true
                })
                this.props.history.push('/login')
            })
        }else{
            this.props.history.push('/login')
        }
    }
    render() {
        return (
            <>
                <Container className="cart-container" fluid="md">
                    <h2 className="my-5 text-center font-weight-bold"><i>CART</i></h2>
                    <form  action="/cart">
                        <div className="content-table">
                            <div className="cart-table-headers">
                                <div className="cart-table-header">
                                    
                                </div>
                                <div className="cart-table-header">
                                    Price
                                </div>
                                <div className="cart-table-header">
                                    Quantity
                                </div>
                                <div className="cart-table-header">
                                    Total
                                </div>
                            </div>
                            {this.props.cart.length >0?
                            this.props.cart.map(product=>{
                                return <CartProduct 
                                            product={product}
                                            updateCart={this.props.updateCart}
                                            deleteCart={this.props.deleteCart}
                                        />
                            })
                            : <h3>EMPTY</h3>
                            }
                        </div>
                        
                            <div className="cart-total mt-3">
                                <h4>SUBTOTAL {this.props.total_price} €</h4>
                                <p>Shipping, taxes, and discount codes calculated at checkout.</p>
                            </div>
                    </form>
                    {this.props.cart.length>0 &&
                        <Link className="cart-btn my-3" onClick={this.handleCheckout}>Check out</Link>
                    }
                    <div className="continue-shop mb-5">Continue shopping</div>
                </Container>
            </>
        )
    }
}
const mapStateToProps = (state)=>{
    const total_price = state.cart.reduce((sum, product)=>{
        return sum = (product.quantity*product.price) + sum
    },0)
    return {
        cart: state.cart,
        total_price
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        updateCart: (id_cart, quantity)=>{
            dispatch({
                type: "UPDATE_CART",
                payload: {
                    id_cart,
                    quantity
                }
            })
        },
        deleteCart: id_cart =>{
            dispatch({
                type: "DELETE_CART",
                payload: id_cart
            })
        },
        clearCart: () =>{
            dispatch({
                type: "CLEAR_CART"
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))
