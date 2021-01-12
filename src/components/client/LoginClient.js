import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import API_CONSTANT from './../../assets/constant/api'
import { Button,Card, Form, FormGroup, Label, Input} from 'reactstrap'
import {withRouter} from 'react-router-dom'


class LoginClient extends Component {
    state={
        email: "",
        password: ""
    }
    componentDidMount(){
        const token = window.localStorage.getItem('client_token')
        if(token){
            this.props.history.push('/products')
        }else{
            this.props.history.push('/login')
        }
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleLogin=(event)=>{
        event.preventDefault();
        axios.post(`${API_CONSTANT.domain}/login`, {
            email: this.state.email,
            password: this.state.password
        }).then(res=>{
            console.log(res);
            const token = res.data;
            window.localStorage.setItem('client_token', token);
            Swal.fire({
                title: "Login Succesfully",
                timer: 1000,
                icon: 'success'
            }).then(()=>{
                this.props.history.push('/products')
            })
        }).catch(err=>{
            console.log(err)
            Swal.fire({
                title: "Login Unsuccesfully",
                timer: 1000,
                icon: 'error'
            })
        })
    }
    render() {
        return (
            <div className="login-page d-flex justify-content-center align-items-center">
                <Card className="login-modal">
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={3}>Email</Label>
                            <Input type="email" 
                                    name="email" 
                                    id="Email" 
                                    placeholder="with a placeholder" 
                                    onChange={this.handleChange}
                                    />
                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePassword" sm={3}>Password</Label>
                            <Input type="password" 
                                    name="password" 
                                    id="Password" 
                                    placeholder="password placeholder"
                                    onChange={this.handleChange} 
                                    />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default withRouter(LoginClient);