import React from 'react'

export default function ProductRow(props) {
    const editProduct = ()=>{
        props.updateIsEditting(props.product.id)
    }
    const deleteProduct = () =>{
        props.handleDeleteProduct(props.product.id)
    }
    const {id,name,price,image} = props.product
        return (
            <div className="table-rows">
                <div className="table-cell">
                    {id}
                </div>
                <div className="table-cell">
                    {name}
                </div>
                <div className="table-cell">
                    {price}€
                </div>
                <div className="table-cell">
                    <img src={image[0]}  alt=""/>
                </div>
                <div className="table-cell">
                    <button className="btn" onClick={editProduct}>Edit</button>
                    <button className="btn" onClick={deleteProduct}>Delete</button>
                </div>
             </div>
        )
}
