import { Component } from 'react';

let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'https://phonebook-backend-project3.herokuapp.com';
}


class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            socialLinks: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentDidMount() {
        this.setUpdateContact();
    }
    setUpdateContact() {
        this.setState({
            _id: this.props.contactUpdate._id,
            firstName: this.props.contactUpdate.firstName,
            lastName: this.props.contactUpdate.lastName,
            phoneNumber: this.props.contactUpdate.phoneNumber,
            address: this.props.contactUpdate.address,
            socialLinks: this.props.contactUpdate.socialLinks
        })
    }

    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }
    handleSubmit(event) {
        fetch(`${baseURL}/contacts/${this.props.contactUpdate._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                socialLinks: this.state.socialLinks
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                this.props.updateContact(resJson)
                this.setState({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                    socialLinks: ''
                })
            })
            .catch(error => console.log({ 'Error': error }))
    };



    render() {
        return (
            <div>
                <h5>
                    Edit Contact
                </h5>
                <form className="mb-5" onSubmit={this.handleSubmit}>
                    
                <div className="form-row mr-3 ml-3">
                    <div className="form-group col">
                        <label htmlFor="firstName"></label>
                        <input className="form-control" type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder={this.state.firstName} />
                    </div>

                    <div className="form-group col">   
                        <label htmlFor="lastName"></label>
                        <input className="form-control" type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder={this.state.lastName} />
                    </div>
                </div>    

                <div className="form-group mr-3 ml-3">
                    <label htmlFor="phoneNumber"></label>
                    <input className="form-control" type="text" name="phoneNumber" id="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} placeholder={this.state.phoneNumber} />
                </div>

                <div className="form-group mr-3 ml-3">
                    <label htmlFor="address"></label>
                    <input className="form-control mb-1" type="text" name="address" id="address" value={this.state.address} onChange={this.handleChange} placeholder={this.state.address} />
                </div>

                <div className="form-group mr-3 ml-3">
                    <label htmlFor="socialLinks"></label>
                    <input className="form-control mb-5" type="text" name="socialLinks" id="socialLinks" value={this.state.socialLinks} onChange={this.handleChange} placeholder={this.state.socialLinks} />
                </div>

                <div className="form-group mr-5 ml-5">
                    <input className="form-control mb-3 btn btn-dark" type="submit" value="Save Changes" />
                </div>

                </form>
            </div>
        )
    }
};

export default Contact;