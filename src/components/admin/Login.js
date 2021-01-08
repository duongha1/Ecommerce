import React, { Component } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import { Button,Card, Form, FormGroup, Label, Input} from 'reactstrap'
import API_CONSTANT from './../../assets/constant/api'


class Login extends Component {
    state={
        email: '',
        password: ''
    }
    componentDidMount(){
        const token = window.localStorage.getItem('admin_token');
        if(token){
            this.props.history.push('/admin')
        }else{
            this.props.history.push('/admin/login')
        }
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleLogin=(event)=>{
        event.preventDefault();
        Axios.post(`${API_CONSTANT.domain}/login`,{
            ...this.state
        }).then(res=>{
            const token = res.data;
            window.localStorage.setItem('admin_token', token)
            Swal.fire({
                title: "Login Succesfully",
                timer: 1000,
                icon: 'success'
            }).then(()=>{
                this.props.history.push('/admin')
            })
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                title: "Login Unsuccesfully",
                timer: 1000,
                icon: 'error'
            })
        })
    }
    render(){
        return(
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
        );
    }
}

export default withRouter(Login);