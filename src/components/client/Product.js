import React from 'react'
import {Button, 
    Col, 
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap'
import {Link} from 'react-router-dom'

export default function Product(props) {
    const {id,name,price,image} = props;
    return (
        <Col md={4} className="mb-5">
            <CardImg top width="100%" src={image[0]} alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">
                    <Link className="product-name" to={`/products/${id}`}>{name}</Link>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{price}$</CardSubtitle>
                <Button className="btn-custom" outline>Add to cart</Button>
            </CardBody>
        </Col>
    )
}

