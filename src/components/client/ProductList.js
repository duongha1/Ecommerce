import React, { Component } from 'react'
import { Row, Spinner } from 'reactstrap'
import Product from './Product'
import axios from 'axios'
import API from '../../assets/constant/api'

export default class ProductList extends Component {
    state={
        id:0,
        name: "",
        price: 0,
        image: "",
        products: [],
        loading: true
    }
    componentDidMount(){
        axios.get(`${API.domain}/products`)
            .then(res=>{
                this.setState({
                    products: res.data,
                    loading: false
                })
            })
    }
    render() {
        return (
            <div>
                <Row>
                    {this.state.loading&&<Spinner className="m-auto" color="dark" />}
                    {this.state.products.map((product, index)=>{
                        return <Product key={index}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                    })}
                </Row>
            </div>
        )
    }
}
