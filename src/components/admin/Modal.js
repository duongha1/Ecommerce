import React, { Component } from 'react'

export default class Modal extends Component {
    state = {
        name: '',
        price: 0,
        image_one: '',
        image_two: '',
        image_three: ''
    }
    componentDidMount(){
        if(this.props.isEditted){
            const {name, price, image} = this.props.isEditted;
            this.setState({
                name,
                price,
                image_one: image[0],
                image_two: image[1],
                image_three: image[2]
            })
        }else{
            console.log('create')
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const {name, price, image_one, image_two, image_three} = this.state;
        const image = [
            image_one,
            image_two,
            image_three
        ]
        if(this.props.isEditted){
            this.props.handleUpdateProduct(name, price, image)
        }else{
            this.props.handleAddProduct(name, price, image)
        }
        this.props.toggleModal()
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClose=()=>{
        this.props.toggleModal();
    }
    componentWillUnmount(){
        this.props.clearIsEditting();
    }
    render(){
        const {name, price, image_one, image_two, image_three} = this.state;
        return(
            <div className="modal">
                <div className="content">
                    <button type="button" className="close btn btn-outline-primary" onClick={this.handleClose}>
                            Close
                    </button>
                    <h5>{this.props.isEditted?'Edit':'Create'}</h5>
                    <form className="p-3" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Product Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Product Name" value={name} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Price</label>
                            <input type="number" name="price" className="form-control" placeholder="Price" value={price} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Image</label>
                            <input type="text" name="image_one" className="form-control" placeholder="Image" value={image_one} onChange={this.handleChange}/>
                            <input type="text" name="image_two" className="form-control" placeholder="Image" value={image_two} onChange={this.handleChange}/>
                            <input type="text" name="image_three" className="form-control" placeholder="Image" value={image_three} onChange={this.handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">{this.props.isEditted?'Update':'Add'}</button>
                    </form>
                </div>
            </div>
        );
    }
}
