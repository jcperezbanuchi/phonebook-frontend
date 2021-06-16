import { Component } from 'react'


let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://phonebook-backend-project3.herokuapp.com';
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
    fetch(`${baseURL}/contacts`, {
      method: 'POST',
      body: JSON.stringify(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          socialLinks: this.state.socialLinks
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
  <form action="" className=" mb-5" onSubmit={this.handleSubmit}>

    
  <div className="form-row mr-3 ml-3">
    <div className="form-group col">
      <label htmlFor="firstName"></label>
      <input  className="form-control" type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} placeholder="First Name"/>
    </div>

    <div className="form-group col">
      <label htmlFor="lastName"></label>
      <input className="form-control" type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name"/>
    </div>
  </div>

  <div className="form-group mr-3 ml-3">
      <label htmlFor="phoneNumber"></label>
      <input className="form-control" type="text" id="phoneNumber" name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber} placeholder="Phone Number: xxx-xxx-xxxx"/>
  </div>


  <div className="form-group mr-3 ml-3">
      <label htmlFor="address"></label>
      <input className="form-control mb-1" type="text" id="address" name="address" onChange={this.handleChange} value={this.state.address} placeholder="Street Address"/>
  </div>

  <div className="form-group mr-3 ml-3">        
      <label htmlFor="socialLinks"></label>
      <input className="form-control mb-5" type="text" id="socialLinks" name="socialLinks" onChange={this.handleChange} value={this.state.socialLinks} placeholder="Social Link"/>
  </div>

  <div className="form-group mr-5 ml-5">
      <input className="form-control mb-3 btn btn-dark" type="submit" value="Add to Phonebook"/>
  </div>

  </form>
  </div>

    )
  }
};

export default NewForm;