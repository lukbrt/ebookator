import React, { Component } from 'react';
import '../../App.scss';
import { callApi, sendFormData, getCookie } from '../../Helpers';
import { Link, Redirect } from 'react-router-dom';

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
    flexDirection: "column",
    border: "none"
}

class AddBook extends Component 
{
    state = {
        authors: [],
        books: [],
        genres: [],
        IsColorful: false,
        Pages: 0,
        Title: '',
        Description: '',
        Language: '',
        Thumbnail: '',
        Author_IdAuthor: 1,
        Genre_IdGenre: 1
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        callApi(`authors`)
            .then(res => this.setState({ authors: res }))
            .catch(err => console.log(err));

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

    //TODO
    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        sendFormData('book/add', data)
        .then(res => {
            this.setState({ status: res.status });
        })
    }

    redirectIfUnauthorized = () => {
        if (!getCookie("Token")) {
            return <Redirect to='/login'  />
        }
    }

    render()
    {
        const { authors, genres } = this.state;
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
                <h1>Dodaj książkę:</h1>
                <form
                    onSubmit={this.handleSubmit}
                    style={formStyles}
                    className="styled-form"
                    // enctype="multipart/form-data"
                >
                    <div>
                        <label htmlFor="Title">Tytuł</label>
                        <input type="text" name="Title" id="Title" minLength="2" size="60" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Description">Opis</label>
                        <textarea name="Description" id="Description" rows="6" cols="60" minLength="20" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Language">Język</label>
                        <input type="text" name="Language" id="Language" size="60" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Path">Ścieżka</label>
                        <input type="text" name="Path" id="Path" size="60" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Thumbnail">Miniaturka</label>
                        <input type="text" name="Thumbnail" id="Thumbnail" size="60" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Pages">Grubość</label>
                        <input type="number" name="Pages" id="Pages" min="0" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Author_IdAuthor">Autor</label>
                        <select name="Author_IdAuthor" id="Author_IdAuthor" onChange={this.handleInputChange} required>
                            {
                                authors.map(author =>
                                    <option value={author.IdAuthor} key={author.IdAuthor}>
                                        {author.Firstname} {author.Surname}
                                    </option>  
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="Genre_IdGenre">Gatunek</label>
                        <select name="Genre_IdGenre" id="Genre_IdGenre" onChange={this.handleInputChange} required>
                            {
                                genres.map(genre =>
                                    <option value={genre.IdGenre} key={genre.IdGenre}>
                                        {genre.Name}
                                    </option>  
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="File">Plik</label>
                        <input type="file" name="File" id="File" accept=".pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label>
                            <input type="checkbox" id="IsColorful" name="IsColorful" onChange={this.handleInputChange} />W kolorze
                        </label>
                    </div>

                    <button type="submit">Dodaj</button>
                    <p
                        style={{
                            fontSize: "1.4em",
                            fontWeight: "bolder",
                            marginBottom: "0",
                            display: `${this.state.status === '' ? "none" : "block"}`
                        }}>{this.state.status}</p>

                    {/* <Stmt status={this.state.status} /> */}
                </form>
            </div>
        );
    }
}

export default AddBook;