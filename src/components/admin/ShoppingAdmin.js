import React, { Component } from 'react'
import SideBar from './SideBar.js'
import NavBar from './NavBar.js'
import MainContent from './MainContent.js'
import {Row, Col, Container} from 'reactstrap'
import {withRouter} from 'react-router-dom'


class ShoppingAdmin extends Component {
    state={
        open: false
    }
    componentDidMount(){
        const token = window.localStorage.getItem('admin_token');
        if(token){
            this.props.history.push('/admin')
        }else{
            this.props.history.push('/admin/login')
        }
    }
    toggleSidebar = () =>{
        this.setState({
            open: !this.state.open
        })
    }
    handleLogout = ()=>{
        window.localStorage.removeItem('admin_token');
        this.componentDidMount();
    }
    render() { 
        return (
            <Container >
                <Row>
                    {/* sidebar close */}
                    <Col md={3} style={{'display': this.state.open?'block':'none'}}>
                        <SideBar></SideBar>
                    </Col>
                    <Col md={this.state.open ? 9 : 12}>
                        <NavBar toggleSidebar={this.toggleSidebar}
                                handleLogout={this.handleLogout}
                        />
                        <MainContent></MainContent>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(ShoppingAdmin);