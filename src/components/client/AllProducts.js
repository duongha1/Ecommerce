import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProductList from './ProductList'
import SidebarClient from './SidebarClient'

export default function AllProducts() {
    return (
        <>
            <Container fluid className="mt-5">
                <Row>
                    <Col md={3}><SidebarClient/></Col>
                    <Col md={9}>
                        <ProductList/>
                    </Col>
                </Row>
            </Container>
        </>
        
    )
}
