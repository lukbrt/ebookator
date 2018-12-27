import React, { Component } from 'react';
import '../App.scss';
import { Formik } from 'formik';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
};

const formStyles = {
    display: "flex",
    flexDirection: "column"
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
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" id="login" />
                    </div>
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="pswd">Hasło</label>
                        <input type="password" name="pswd" id="pswd" />

                    </div>
                    <button type="submit">Zaloguj</button>
                </form>
            </div>
        );
    }
}

export default LogIn;