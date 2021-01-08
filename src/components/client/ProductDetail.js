import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Button, Card, Col, Container, Row, Spinner } from 'reactstrap';
import ImageContainer from './ImageContainer'
import CommonQuantityInput from './CommonQuantityInput'
import axios from 'axios'
import API_CONSTANT from '../../assets/constant/api';


class ProductDetail extends Component {
    state={
        quantity:0,
        producr_detail:{
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
                    producr_detail:res.data,
                    loading: true
                })
            })
    }
    handdleChangeQuantity=(data)=>{
        this.setState({
            quantity: this.state.quantity + data
        })
    }
    render() {
        const {image, name, price} = this.state.producr_detail;
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
                                <Button  color="dark" outline>Add to cart</Button>
                            </Card>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}

export default withRouter(ProductDetail)