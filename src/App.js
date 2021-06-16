import React, { Component } from 'react';
import Header from './components/Header';
import NewForm from './components/NewForm';
import Contact from './components/Contact';
import Modal from './components/Modal'
import User from './components/User'


let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://phonebook-backend-project3.herokuapp.com';
}

console.log('current base URL:', baseURL);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      showForm: false,
      contactUpdate: {},
      showLogin: true
    }
    this.handleAddContact = this.handleAddContact.bind(this)
    this.updateContact = this.updateContact.bind(this)

    this.toggleForm = this.toggleForm.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.showModal = this.showModal.bind(this)
  }
  componentDidMount() {
    this.getContacts()
  }

  handleChange(event) {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  getContacts() {
    fetch(`${baseURL}/contacts`)
      .then(data => { return data.json() }, err => console.log(err))
      .then(parsedData => this.setState({ contacts: parsedData }), err => console.log(err))
  }


  toggleForm(contact) {
    this.setState({
      showForm: true,
      contactUpdate: contact
    })
  }

  handleAddContact(contact) {
    const copyContacts = [...this.state.contacts]
    copyContacts.unshift(contact)
    this.setState({
      contacts: copyContacts,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      socialLinks: ''
    })
  }


  updateContact(contact) {
    contact.preventDefault()
    fetch(`${baseURL}/contacts/${contact._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        address: contact.address,
        socialLinks: contact.socialLinks
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJson => {
        const copyContacts = [...this.state.contacts]
        const findIndex = this.state.contacts.findIndex(contact => contact._id === resJson._id)
        copyContacts[findIndex].firstName = resJson.firstName
        copyContacts[findIndex].lastName = resJson.lastName
        copyContacts[findIndex].phoneNumber = resJson.phoneNumber
        copyContacts[findIndex].address = resJson.address
        copyContacts[findIndex].socialLinks = resJson.socialLinks
        this.setState({ contacts: copyContacts })
      })
    this.setState({
      showForm: false
    })

  }

  deleteContact(id) {
    fetch(`${baseURL}/contacts/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status === 200) {
          const findIndex = this.state.contacts.findIndex(contact => contact._id === id)
          const copyContacts = [...this.state.contacts]
          copyContacts.splice(findIndex, 1)
          this.setState({
            contacts: copyContacts
          })
        }
      })
  }

  showModal(e) {
    this.setState({
      showModal: !this.state.showModal,
    })
    console.log(e.currentTarget)
  }

  toggleLogin() {
    this.setState({
      showLogin: false
    })
  }


  render() {
    return (
      <div className="container">
        <Header />

        <User />


        {
          this.state.showForm
            ?
            <Contact updateContact={this.updateContact} contactUpdate={this.state.contactUpdate} />
            :
            <NewForm className="new-form" handleAddContact={this.handleAddContact} />
        }

        <div className="form">
          <table>
            <tbody>
              {this.state.contacts.map(contact => {
                return (
                  <tr key={contact._id}>
                    <td>
                      <Modal
                        contact={contact}
                        showModal={this.state.showModal}
                        closeModal={this.showModal}
                      />
                      <div className="name" onClick={(contact) => { this.showModal(contact) }}>{contact.firstName} {contact.lastName}</div>
                    </td>
                    <td className="phone">{contact.phoneNumber}</td>
                    <td className="address">{contact.address}</td>
                    <td className="social">{contact.socialLinks}</td>
                    <td><button className="btn btn-info" onClick={() => this.toggleForm(contact)}>Edit</button></td>
                    <td ><button className="btn btn-danger" onClick={() => this.deleteContact(contact._id)}>Delete</button></td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
          {/* <Modal
            contacts={this.state.contacts}
            showModal={this.state.showModal}
            closeModal={this.showModal}
          /> */}

        </div>

      </div >
    )
  }
}

export default App;