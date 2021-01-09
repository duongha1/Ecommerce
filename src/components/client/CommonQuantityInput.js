import React from 'react'
import { Col, Row } from 'reactstrap'

export default function CommonQuantityInput(props) {
    return (
        <Row className="quantity-input">
            <Col md={2} className="plus" onClick={()=>props.onChange && props.onChange(+1,false)}>+</Col>
            <Col md={3} className="quantity">
                <input value={props.value||0} onChange={(event)=>props.onChange && props.onChange(Number(event.target.value),true)}/>
            </Col>
            <Col md={2} className="minus" onClick={()=>{(props.value <= 0) ? props.onChange(0,false) : (props.onChange && props.onChange(-1,false))}}>-</Col>
        </Row>
    )
}
