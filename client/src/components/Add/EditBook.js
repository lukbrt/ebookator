import React, { Component } from 'react';
import styled from 'styled-components'
import '../../App.scss';
import { callApi, sendPost, sendDelete, sendFormData, getCookie } from '../../Helpers';
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
    flexDirection: "column",
    border: "none"
}

class EditBook extends Component 
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
        Genre_IdGenre: 1,
        File: ''
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        callApi(`book/${id}`)
        .then(res => this.setState({ ...res }))
        .catch(err => console.log(err));

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
        
        // const { Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre } = this.state;
        // console.log(this.state);
        // sendPost('/book/add', { Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre })
        //     .then(res => {
        //         this.setState({ status: res.status });
        //         // window.location.reload();
        //     });

        sendFormData(`/book/update/${this.state.IdBook}`, data)
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
        // const { IdBook, Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description } = this.state;
        const { authors, genres } = this.state;
        const { Title, Thumbnail, Description, Pages, Path, IsColorful, Language, Genre_IdGenre, Author_IdAuthor, File } = this.state;
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
                    className="styled-form"
                    // enctype="multipart/form-data"
                >
                    <div>
                        <label htmlFor="Title">Tytuł</label>
                        <input type="text" value={Title} name="Title" id="Title" minLength="2" size="60" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Description">Opis</label>
                        <textarea name="Description" value={Description} id="Description" rows="6" cols="60" minLength="20" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Language">Język</label>
                        <input type="text" name="Language" value={Language} id="Language" size="60" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Path">Ścieżka</label>
                        <input type="text" value={Path} name="Path" id="Path" size="60" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Thumbnail">Miniaturka</label>
                        <input type="text" value={Thumbnail} name="Thumbnail" id="Thumbnail" size="60" minLength="1" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Pages">Grubość</label>
                        <input type="number" value={Pages} name="Pages" id="Pages" min="0" onChange={this.handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="Author_IdAuthor">Autor</label>
                        <select value={Author_IdAuthor} name="Author_IdAuthor" id="Author_IdAuthor" onChange={this.handleInputChange} required>
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
                        <select value={Genre_IdGenre} name="Genre_IdGenre" id="Genre_IdGenre" onChange={this.handleInputChange} required>
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
                            <input checked={IsColorful ? "checked" : ""} type="checkbox" id="IsColorful" name="IsColorful" onChange={this.handleInputChange} />W kolorze
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

export default EditBook;