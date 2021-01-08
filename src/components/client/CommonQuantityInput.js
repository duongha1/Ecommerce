import React from 'react'
import { Col, Row } from 'reactstrap'

export default function CommonQuantityInput(props) {
    return (
        <Row className="quantity-input">
            <Col md={2} className="plus" onClick={()=>props.onChange(+1)}>+</Col>
            <Col md={3} className="quantity">
                <input value={props.value||0} />
            </Col>
            <Col md={2} className="minus" onClick={()=>props.onChange(-1)}>-</Col>
        </Row>
    )
}
