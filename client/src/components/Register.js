import React, { Component } from 'react';
import '../App.scss';
import { Link } from 'react-router-dom';
import { sendData, sendPost } from '../Helpers';
// import { Formik } from 'formik';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
};

class Register extends Component 
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

        sendPost('/register', this.state)
            .then(res => this.setState({ status: res.message }));

        // sendData('/register', this.state, (res) => {
        //     this.setState({ status: res.message });
        //     // this.forceUpdate();
        //     // try 
        //     // {
        //     //     console.log(res);
        //     //     // for (let pole in res)
        //     //     //     console.log(`${pole}: ${res[pole]}`);
        //     //     if (res.status === 200)
        //     //     {
        //     //         this.setState({status: res});
        //     //     }
        //     //     else
        //     //     {
        //     //         this.setState({status: res});
        //     //     }
        //     // }
        //     // catch (error) 
        //     // {
        //     //     console.log(error);
        //     //     this.setState({status: res});
        //     // }
        // });
    }

    render()
    {
        return (
            <div
                style={styles}
                className="dark-text"
            >
                <h1>Rejestracja:</h1>
                <form 
                    method="post"
                    className="styled-form" 
                    style={{ paddingTop: "10px" }}
                    onSubmit={this.handleSubmit}
                >
                    <div className="close">
                        <Link to="/">
                            <img style={{ width: "36px" }} src="https://img.icons8.com/nolan/64/000000/delete-sign.png" alt="close" />
                        </Link>
                    </div>

                    <div>
                        <label htmlFor="Login">Login</label>
                        <input type="text" name="Login" id="Login" minLength="3" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Password">Hasło</label>
                        <input type="password" name="Password" id="Password" minLength="6" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Email">E-mail</label>
                        <input type="email" name="Email" id="Email" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Firstname">Imię</label>
                        <input type="text" name="Firstname" id="Firstname" onChange={this.handleInputChange}  />
                    </div>

                    <div>
                        <label htmlFor="Surname">Nazwisko</label>
                        <input type="text" name="Surname" id="Surname" onChange={this.handleInputChange}  />
                    </div>

                    <button type="submit">Zarejestruj</button>

                    <p 
                    style={{
                        fontSize: "1.4em", 
                        fontWeight: "bolder",
                        marginBottom: "0",
                        display: `${this.state.status === '' ? "none" : "block"}`
                    }}>{this.state.status}</p>
                </form>
            </div>
        );
    }
}

export default Register;