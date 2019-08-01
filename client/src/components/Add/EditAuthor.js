import React, { Component } from 'react';
import '../../App.scss';
import { callApi, sendPost, getCookie } from '../../Helpers';
import { Link, Redirect } from 'react-router-dom';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "10px",
    width: "fit-content",
    margin: "0 auto"
};

const formStyles = {
    display: "flex",
    flexDirection: "column"
}

class EditAuthor extends Component 
{
    state = {

    }

    componentDidMount()
    {
        const { id } = this.props.match.params;
        this.setState({ IdAuthor: id });

        callApi(`author/${id}`)
            .then(res => this.setState({ ...res }))
            .catch(err => console.log(err));
    }

    handleInputChange = (event) =>
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        console.log(this.state);
        console.log(this.state.Name);
        sendPost(`/author/update/${this.state.IdAuthor}`, this.state)
            .then(res =>
            {
                this.setState({ status: res.status });
            });
    }

    redirectIfUnauthorized = () =>
    {
        if (!getCookie("Token"))
        {
            return <Redirect to='/login' />
        }
    }

    render()
    {
        const { Firstname, Surname, Origin } = this.state;

        return (
            <div
                style={styles}
                className="dark-text dark-thick-border"
            >
                {this.redirectIfUnauthorized()}
                <div className="close">
                    <Link to="/">
                        <img style={{ width: "36px" }} src="https://img.icons8.com/nolan/64/000000/delete-sign.png" alt="close" />
                    </Link>
                </div>
                <h1>Edytuj książkę:</h1>
                <form
                    onSubmit={this.handleSubmit}
                    style={formStyles}
                >
                    <div>
                        <label htmlFor="Firstname">Imiona</label>
                        <input type="text" value={Firstname} name="Firstname" id="Firstname" minLength="2" size="60" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Surname">Nazwisko</label>
                        <input type="text" value={Surname} name="Surname" id="Surname" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Origin">Pochodzenie</label>
                        <input type="text" value={Origin} name="Origin" id="Origin" minLength="2" onChange={this.handleInputChange} required />
                    </div>
                    <button type="submit">Edytuj</button>
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

export default EditAuthor;