import React, { Component } from 'react';
import '../App.scss';
import { Formik } from 'formik';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
};

class Register extends Component 
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
                <h1>Rejestracja:</h1>
                <form className="styled-form">
                    <div>
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" id="login" />
                    </div>

                    <div>
                        <label htmlFor="pswd">Hasło</label>
                        <input type="password" name="pswd" id="pswd" />
                    </div>

                    <div>
                        <label htmlFor="emailAddress">E-mail</label>
                        <input type="email" name="emailAddress" id="emailAddress" />
                    </div>

                    <div>
                        <label htmlFor="firstname">Imię</label>
                        <input type="text" name="firstname" id="firstname" />
                    </div>

                    <div>
                        <label htmlFor="surname">Nazwisko</label>
                        <input type="text" name="surname" id="surname" />
                    </div>

                    <button type="submit">Zarejestruj</button>
                </form>
            </div>
        );
    }
}

export default Register;