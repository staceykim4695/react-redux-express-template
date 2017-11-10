import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Title from './Title';
import Modal from 'react-modal';
import axios from 'axios';
import Feed from './Feed';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

// handleRegister --> axios.get call --> on success, successful login, action that signifies that registration is completed

    handleRegister() {
      axios.post('/api/register', {
        username: this.username.value,
        password: this.password.value
      })
        .then((response) => {
          this.props.handleRegister(response.data.username, response.data.points);
        })
    }

    handleLogin() {
      axios.post('/api/login', {
        username: this.username.value,
        password: this.password.value
      })
      .then((response) => {
        this.props.handleLogin(response.data.username, response.data.points);
      })
    }

    handleLogout() {
      axios.get('/api/logout')
        .then(response => {
          if (response.data.success === true) {
            this.props.handleLogout();
        }
      })
    }

    render() {

        if (this.props.username === '') {
          return (
            <div>
              <button onClick={() => this.props.toggleLoginModal()}>Register</button>
              <button onClick={() => this.props.toggleLoginModal()}>Login</button><br />
              <Feed />
              <Modal
                isOpen={this.props.isModalOpen}
                // onAfterOpen={this.afterOpenModal}
                // onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                  <span>
                    <input type="text" name="username" ref={(input) => { this.username = input; }} placeholder="Username" />
                    <input type="password" name="password" ref={(input) => { this.password = input; }} placeholder="Password"/>
                  </span>
                  <button onClick={() => this.handleRegister()}>Register</button>
                  <button onClick={() => this.handleLogin()}>Login</button>
                  <button onClick={() => this.props.toggleClose()}>Close</button>
              </Modal>
            </div>
          )
        } else {
          return (
            <div>
              Hello {this.props.username}<br />
                <button onClick={() => this.handleLogout()}>Logout</button><br />
                <Feed />
            </div>
          )
        }
      }
    }

const mapStateToProps = (state) => ({
    isModalOpen: state.modalIsOpen,
    username: state.username,
    points: state.points
});

const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch({type: 'TOGGLE_LOGIN_MODAL'}),
    toggleClose: () => dispatch({type: 'TOGGLE_CLOSE'}),
    handleRegister: (username, points) => dispatch({type: 'SAVE_REGISTER', username, points}),
    handleLogin: (username, points) => dispatch({type: 'SAVE_LOGIN', username, points}),
    handleLogout: () => dispatch({type: 'LOGOUT'})
});

SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBar);


export default SideBar;
