import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'

export default class ImageContainer extends Component {
    state={
        items:[],
        selected: 0
    }
    componentDidMount(){
        this.setState({
            items: this.props.items
        })
    }
    handleSelect = (index) =>{
        this.setState({
            selected: index
        })
        console.log("aaa")
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <img className="img-item" src={(typeof this.state.items !== 'string')?this.state.items[this.state.selected]: this.state.items} alt={this.props.name}></img>
                </Row>
                <Row>
                    {this.state.items.map((item,index)=>{
                        return <Col md={4} onClick={()=>this.handleSelect(index)}>
                                    <img className="img-item" key={index} src={item} alt={this.props.name}></img>
                                </Col>
                    })}
                </Row>
            </Container>
        )
    }
}
