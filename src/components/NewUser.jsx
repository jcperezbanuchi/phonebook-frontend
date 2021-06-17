import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'https://phonebook-backend-project3.herokuapp.com';
}

export default class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    closeUser(event) {
        this.props.closeUser && this.props.closeUser(event)
    }

    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }


    handleSubmit(e) {
        e.preventDefault()
        fetch(`${baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify({

                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        this.setState({
            username: '',
            password: '',

        })

    }

    render() {
        return (
            <div>
                <form className="login mb-5" onSubmit={this.handleSubmit} >

                    <div className="form-group mr-2 ml-2">
                        <label className="user-name" htmlFor="name"></label>
                        <input className="form-control" type="text" name="name" placeholder="name" id="name" onChange={this.handleChange} required />
                    </div>
                    <div className="form-group mr-2 ml-2">
                        <label className="user-name" htmlFor="username"></label>
                        <input className="form-control" type="text" name="username" placeholder="Username" id="username" onChange={this.handleChange} required />
                    </div>

                    <div className="form-group mb-4 mr-2 ml-2">
                        <label className="password" htmlFor="password"></label>
                        <input className="form-control mb-3" type="password" name="password" placeholder="Password" id="password" onChange={this.handleChange} required />
                    </div>

                    <div className="form-group mr-5 ml-5">
                        <input className="form-control" type="submit" value="Create User" />
                    </div>
                </form>
            </div >
        )
    }
}
