import { Component } from 'react';


class Modal extends Component {
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
    }
    // componentDidMount() 

    closeModal(e) {
        this.props.closeModal && this.props.closeModal(e) 
    }

    render() {
        if (!this.props.showModal) {
            return null
        }
        return (
            <div className="modal" onClick={(e) => {this.closeModal(e)}}>
                <div className="modal-content">
                    <div>
                        <button onClick={(e) => {this.closeModal(e)}} className="close-modal">
                            X
                        </button>
                    </div>
                    <div>
                        <div>
                            First Name: {this.props.contact.firstName}
                            <br />
                            Last Name: {this.props.contact.lastName}
                            <br />
                            Phone #: {this.props.contact.phoneNumber}
                            <br />
                            Address: {this.props.contact.address}
                            <br />
                            Social Links: {this.props.contact.socialLinks}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Modal;


// import React, { Component } from 'react'

// class Modal extends Component {
//     constructor(props){
//         super(props)
//         this.state = {

//         }
//     }

//     closeModal(e) {
//         this.props.closeModal && this.props.closeModal(e) 
//     }

//     render() {
//         if (!this.props.showModal) {
//             return null
//         }
//         return (
//             <div className="modal" onClick={(e) => {this.closeModal(e)}}>
//                 <div className="modal-content">
//                     <div>
//                         <button onClick={(e) => {this.closeModal(e)}} className="close-modal">
//                             X
//                         </button>
//                     </div>
//                     <br/>
//                     <ul className="modal-list">
//                         <li>First Name: {this.props.firstName}</li>
//                         <li>Last Name: {this.props.lastName}</li>
//                         <li>Phone Number: {this.props.phoneNumber}</li>
//                     </ul>
//                 </div>    
//             </div>
//         )
//     }
// }

// export default Modal