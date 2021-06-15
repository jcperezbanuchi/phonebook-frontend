import { Component } from 'react'


let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://phonebook-backend-project3.herokuapp.com/';
}

class NewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      socialLinks: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(
        {
          firstName: this.state.firstName, lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber, address: this.state.address, socialLinks: this.state.socialLinks
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        this.props.handleAddContact(resJson)
        this.setState({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          socialLinks: ''
        })
      }).catch(error => console.error({ 'Error': error }))
  }

  render() {
    return (
      <div>
        <h5>Add A New Contact</h5>
        <form className="form mb-5" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName"></label>
          <input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="Add First Name" />

          <label htmlFor="lastName"></label>
          <input className="mb-1" type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Add Last Name" />

          <label htmlFor="phoneNumber"></label>
          <input className="mb-1" type="text" id="phoneNumber" name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber} placeholder="Add Phone Number" />

          <label htmlFor="address"></label>
          <input className="mb-1" type="text" id="address" name="address" onChange={this.handleChange} value={this.state.address} placeholder="Add Address" />

          <label htmlFor="socialLinks"></label>
          <input className="mb-1" type="text" id="socialLinks" name="socialLinks" onChange={this.handleChange} value={this.state.socialLinks} placeholder="Add Social" />


          <input className="add btn btn-dark" type="submit" value="Add to Phonebook" />
        </form>
      </div>

    )
  }
};

export default NewForm;