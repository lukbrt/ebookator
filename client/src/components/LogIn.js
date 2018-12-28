import React, { Component } from 'react';
import '../App.scss';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

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

    }

    render()
    {
        return (
            <div
                style={styles} 
                className="dark-text"
            >
                <h1>Logowanie:</h1>
                <form className="dark-thick-border" style={formStyles}>
                <div className="close">
                    <Link to="/">
                        <img style={{width: "36px"}} src="https://img.icons8.com/nolan/64/000000/delete-sign.png" />
                    </Link>
                </div>
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" id="login" minLength="3" required />
                    </div>
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="pswd">Hasło</label>
                        <input type="password" name="pswd" id="pswd" minLength="6" required />

                    </div>
                    <button type="submit">Zaloguj</button>
                </form>
            </div>
        );
    }
}

export default LogIn;