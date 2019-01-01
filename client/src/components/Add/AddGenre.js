import React, { Component } from 'react';
import '../../App.scss';
import { callApi, sendPost, sendDelete, getCookie } from '../../Helpers';
import { Link, Redirect } from 'react-router-dom';
import { Stmt } from '../Stmt';

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

const Genre = ({ IdGenre, Name }) => (
    <li>
        {Name}
        <button onClick={() => removeGenre(IdGenre)}>X</button>
    </li>
);

//TODO
const removeGenre = (id) => {
    sendDelete(`/genre/delete/${id}`)
    .then(res => {
        // this.setState({ status: res.status });
        window.location.reload();
    });
}

class AddGenre extends Component 
{
    state = {
        genres: [],
        Name: ''
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        callApi(`genres`)
            .then(res => this.setState({ genres: res }))
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

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        console.log( this.state.Name);
        sendPost('/genre/add', { Name: this.state.Name })
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
        const { IdGenre, Name } = this.state;

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
                <h1>Dodaj gatunek:</h1>
                <form
                    onSubmit={this.handleSubmit}
                    style={formStyles}
                >
                    <div className="d-flex space-between align-items-center">
                        <label htmlFor="Name">Nazwa</label>
                        <input type="text" name="Name" id="Name" minLength="3" onChange={this.handleInputChange} required />
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

                <h1>Usuń gatunek</h1>
                <ul>
                    {
                        this.state.genres.map(genre =>
                            <Genre 
                                key={genre.IdGenre}
                                IdGenre={genre.IdGenre} 
                                Name={genre.Name} 
                            />
                            // <li key={genre.IdGenre}>
                            //     {genre.Name}
                            //     <button onClick={(id) => removeGenre(id)}>X</button>
                            // </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default AddGenre;