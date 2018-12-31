import React, { Component } from 'react';
import styled from 'styled-components'
import '../../App.scss';
import { callApi, sendPost, sendDelete, getCookie } from '../../Helpers';
import { Link, Redirect } from 'react-router-dom';
import { Stmt } from '../Stmt';

const StyledItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 2.5%;
    margin: 10px;
    width: fit-content;
`;

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "10px",
    width: "fit-content",
    margin: "20px auto"
};

const formStyles = {
    display: "flex",
    flexDirection: "column"
}

const Author = ({ IdAuthor, Firstname, Surname, Origin }) => (
    <tr>
        <td>{Firstname}</td>
        <td>{Surname}</td>
        <td>{Origin}</td>
        <td>
            <button onClick={() => removeAuthor(IdAuthor)}>X</button>
        </td>
    </tr>
);

const removeAuthor = (id) => {
    sendDelete(`/author/delete/${id}`)
    .then(res => {
        window.location.reload();
    });
}

class AddAuthor extends Component 
{
    state = {
        authors: []
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        callApi(`authors`)
            .then(res => this.setState({ authors: res }))
            .catch(err => console.log(err));
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //TODO
    handleSubmit = (event) => {
        event.preventDefault();
        const { Firstname, Surname, Origin } = this.state;
        console.log(this.state);
        console.log( this.state.Firstname);
        sendPost('/author/add', { Firstname, Surname, Origin })
            .then(res => {
                this.setState({ status: res.message });
                window.location.reload();
            });
    }

    redirectIfUnauthorized = () => {
        if (!getCookie("Token")) {
            return <Redirect to='/login'  />
        }
    }

    render()
    {
        const { IdAuthor, Firstname, Surname, Origin } = this.state;

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
                <h1>Dodaj autora:</h1>
                <form
                    onSubmit={this.handleSubmit}
                    style={formStyles}
                >
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="Firstname">Imię</label>
                        <input type="text" name="Firstname" id="Firstname" minLength="2" onChange={this.handleInputChange} required />
                    </div>

                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="Surname">Nazwisko</label>
                        <input type="text" name="Surname" id="Surname" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="Origin">Pochodzenie</label>
                        <input type="text" name="Origin" id="Origin" minLength="2" onChange={this.handleInputChange} required />
                    </div>
                    <button type="submit">Dodaj</button>
                    {/* <p
                        style={{
                            fontSize: "1.4em",
                            fontWeight: "bolder",
                            marginBottom: "0",
                            display: `${this.state.status === '' ? "none" : "block"}`
                        }}>{this.state.status}</p> */}

                    <Stmt status={this.state.status} />
                </form>

                <h1>Usuń autora</h1>
                <table className="bordered-table">
                    <thead>
                        <tr>
                            <th>Imiona</th>
                            <th>Nazwisko</th>
                            <th>Pochodzenie</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>    
                    
                    <tbody>
                        {
                            this.state.authors.map(author =>
                                <Author 
                                    key={author.IdAuthor}
                                    IdAuthor={author.IdAuthor} 
                                    Firstname={author.Firstname}
                                    Surname={author.Surname}
                                    Origin={author.Origin}
                                />
                                // <li key={genre.IdGenre}>
                                //     {genre.Name}
                                //     <button onClick={(id) => removeGenre(id)}>X</button>
                                // </li>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddAuthor;