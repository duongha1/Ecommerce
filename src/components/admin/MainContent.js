import React, { Component } from 'react'
import ProductRow from './ProductRow'
import ContentHeader from './ContentHeader'
import Modal from './Modal'
import {Spinner} from 'reactstrap'
import Axios from 'axios'
import API_CONSTANT from './../../assets/constant/api'

export default class MainContent extends Component {
    state={
        products: [],
        open_modal: false,
        isEditted: undefined,
        product_id: undefined,
        loading: false
    }
    componentDidMount(){
        this.setState({
            loading: true
        })
        Axios.get(`${API_CONSTANT.domain}/products`)
        .then(res=>{
            this.setState({
                products: res.data,
                loading: false
            })
        })
    }
    toggleModal = () => {
        this.setState({
            open_modal: !this.state.open_modal
        })
    }
    //----------------------ADD---------------------
    handleAddProduct = (name, price, image)=>{
        Axios.post(`${API_CONSTANT.domain}/products`,
        {
            name,price,image
        },
        {
            headers:{
                token: window.localStorage.getItem('admin_token')
            }
        })
        .then(res=>this.componentDidMount())
        .catch(err=>console.log(err))
    }
    //----------------------UPDATE---------------------
    updateIsEditting = (id)=>{
        const product_index = this.state.products.findIndex(product=> id === product.id)
        this.setState({
            isEditted: product_index,
            product_id: id
        })
        console.log(product_index)
        this.toggleModal();
    }
    handleUpdateProduct = (name,price,image)=>{
        const new_product = [...this.state.products]
        Axios.put(`${API_CONSTANT.domain}/products/${this.state.product_id}`,
        {
            ...new_product[this.state.isEditted],name,price,image
        },
        {
            headers:{
                token: window.localStorage.getItem('admin_token')
            }
        })
        .then(res=>this.componentDidMount())
        .catch(err=>console.log(err))
    }
    //----------------------DELETE---------------------
    handleDeleteProduct=(id)=>{
        Axios.delete(`${API_CONSTANT.domain}/products/${id}`,
        {
            headers:{
                token: window.localStorage.getItem('admin_token')
            }
        })
        .then(res=>this.componentDidMount())
        .catch(err=>console.log(err))
    }
    clearIsEditting = ()=>{
        this.setState({
            isEditted: undefined
        })
    }
    render() {
        return (
            <>
                <main>
                    <ContentHeader toggleModal={this.toggleModal}/>
                    {this.state.loading ? <Spinner className="d-flex m-auto" color="dark" /> :
                        <div className="content-table">
                                <div className="table-headers">
                                    <div className="table-header">
                                        ID
                                    </div>
                                    <div className="table-header">
                                        Name
                                    </div>
                                    <div className="table-header">
                                        Price
                                    </div>
                                    <div className="table-header">
                                        Image
                                    </div>
                                    <div className="table-header">
                                        Action
                                    </div>
                                </div>
                                {this.state.products.map(product=>{
                                    return <ProductRow product={product}
                                                        updateIsEditting={this.updateIsEditting}
                                                        handleDeleteProduct={this.handleDeleteProduct}
                                            />
                                })}
                        </div>
                    }
                    {this.state.open_modal ? <Modal modalClose={this.modalClose}
                                                    toggleModal={this.toggleModal}
                                                    handleAddProduct={this.handleAddProduct}
                                                    isEditted={this.state.products[this.state.isEditted]}
                                                    handleUpdateProduct={this.handleUpdateProduct}
                                                    clearIsEditting={this.clearIsEditting}
                                                /> 
                    : ''}
                </main>
            </>
        )
    }
}
