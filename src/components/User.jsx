import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'https://phonebook-backend-project3.herokuapp.com';
}

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }


    handleSubmit() {
        fetch(`${baseURL}/users/`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(resJson => {

                this.setState({
                    username: '',
                    password: ''
                })
            })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">UserName:</label>
                    <input type="text" name="username" placeholder="Username" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="username" placeholder="Username" required />

                    <input type="submit" value="Log In" />
                </form>
            </div>
        )
    }
}
