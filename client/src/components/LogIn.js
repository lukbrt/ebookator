import React, { Component } from 'react';
import '../App.scss';
import { Link } from 'react-router-dom';
import { sendPost } from '../Helpers';
import { Redirect } from 'react-router-dom'
// import { Formik } from 'formik';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
};

const formStyles = {
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px"
}

class LogIn extends Component 
{
    state = {
        status: ''
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        sendPost('/login', this.state)
            .then(res => {
                const { message, Login, IdUser, Token } = res;
                this.setState({ 
                    status: message,
                });

                if (Token)
                {
                    this.setState({
                        Login: Login,
                        IdUser: IdUser
                    });
                    const now = new Date();
                    now.setTime(now.getTime() + 1 * 3600 * 1000);
                    document.cookie = `Login=${Login}; IdUser=${IdUser}; Token=${Token}; expires=${now.toUTCString()}; path=/`;
                    document.cookie = `IdUser=${IdUser}; expires=${now.toUTCString()}; path=/`;
                    document.cookie = `Token=${Token}; expires=${now.toUTCString()}; path=/`;
                }

            });
    }

    renderRedirect = () => {
        if (this.state.IdUser) {
            window.location.reload();
            return <Redirect push to='/'  />
        }
    }

    render()
    {
        return (
            <div
                style={styles} 
                className="dark-text"
            >
                <h1>Logowanie:</h1>
                <form 
                    onSubmit={this.handleSubmit}
                    className="dark-thick-border" 
                    style={formStyles}
                >
                <div className="close">
                    <Link to="/">
                        <img style={{width: "36px"}} src="https://img.icons8.com/nolan/64/000000/delete-sign.png" alt="close" />
                    </Link>
                </div>
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="Login">Login</label>
                        <input type="text" name="Login" id="Login" minLength="3" onChange={this.handleInputChange} required />
                    </div>
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="Password">Hasło</label>
                        <input type="password" name="Password" id="Password" minLength="6" onChange={this.handleInputChange} required />

                    </div>
                    <button type="submit">Zaloguj</button>
                    <p 
                    style={{
                        fontSize: "1.4em", 
                        fontWeight: "bolder",
                        marginBottom: "0",
                        display: `${this.state.status === '' ? "none" : "block"}`
                    }}>{this.state.status}</p>
                </form>
                {this.renderRedirect()}
            </div>
        );
    }
}

export default LogIn;