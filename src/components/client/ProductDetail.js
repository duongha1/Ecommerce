import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Button, Card, Col, Container, Row, Spinner } from 'reactstrap';
import ImageContainer from './ImageContainer'
import CommonQuantityInput from './CommonQuantityInput'
import axios from 'axios'
import API_CONSTANT from '../../assets/constant/api';
import {connect} from 'react-redux'


class ProductDetail extends Component {
    state={
        quantity:1,
        product_detail:{
            id: null,
            name: '',
            image:[]
        },
        loading: false
    }
    componentDidMount(){
        axios.get(`${API_CONSTANT.domain}/products/${this.props.match.params.id}`)
            .then(res=>{
                this.setState({
                    product_detail:res.data,
                    loading: true
                })
            })
    }
    handdleChangeQuantity=(data, operator = false)=>{
        if(operator){ //if operator is true, the quantity is inputed from keyboards
            this.setState({
                quantity: data
            })
        }else{
            this.setState({
                quantity: this.state.quantity + data
            })
        }
    }
    handleAddToCart = ()=>{
        this.props.addToCart({
            ...this.state.product_detail,
            image: this.state.product_detail.image[0]
        }, this.state.quantity)
    }
    render() {
        const {image, name, price} = this.state.product_detail;
        return (
            <Container className="my-5">
                {this.state.loading === false ? <Spinner className="d-flex my-5 mx-auto" color="dark" /> : 
                    <Row>
                        <Col md={6}>
                            <ImageContainer items={image}/>
                        </Col>
                        <Col md={6}>
                            <Card className="p-3 text-center">
                                <h3>{name}</h3>
                                <h5>Price: {price}€</h5>
                                <CommonQuantityInput value={this.state.quantity}
                                    name={name}
                                    onChange={this.handdleChangeQuantity}
                                />
                                <Button  color="dark" onClick={this.handleAddToCart} outline>Add to cart</Button>
                            </Card>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addToCart: (product, quantity)=>{
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    ...product,
                    quantity
                } 
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(ProductDetail))