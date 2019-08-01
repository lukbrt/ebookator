import React, { Component, useState } from 'react';
import styled from 'styled-components'
import '../../App.scss';
import { callApi, getCookie, sendDelete, sendPost } from '../../Helpers';
import { Link } from 'react-router-dom';

const StyledItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px 2.5%;
    margin: 10px;
    width: fit-content;
`;

const readBook = async (id) => {
    if (getCookie("Token"))
    {
        fetch(`/book/download/${id}`).then((response) => {
            response.blob().then(function(myBlob) {
              const fileURL = URL.createObjectURL(myBlob);
              window.open(fileURL);
            });
        });
    }
}

const removeBook = (id) => {
        sendDelete(`/book/delete/${id}`)
        // .then(res => {
        //     // window.location.reload();
        // });
}

const returnBook = (IdUser, IdBook) => {
    sendDelete(`/user/${IdUser}/book/${IdBook}`)
    .then(res => {
        window.location.reload();
});
}

const hireBook = (IdUser, IdBook) => {
    sendPost(`/user/${IdUser}/book/${IdBook}`)
    .then(res => {
        window.location.reload();
    });
}

const CrudBook = ({ Authorized, IdBook, IdUser, Hired }) => {
    if (Authorized)
    {
        const ids = [IdBook, IdUser];
        return (
            <div>
                <button 
                    className="btn-light"
                    value={ IdBook }
                    onClick={() => removeBook(IdBook)}
                >
                    <Link to="/">Usuń</Link>
                </button>
                <button className="btn-light"><Link to={`/edit/book/${IdBook}`}>Edytuj</Link></button>
                <HiredButton Hired={Hired} ids={ids} />
            </div>
        )
    }
    else
    {
        return <div></div>;
    }
}

const HiredButton = ({ Hired, ids }) => {
    if (Hired)
        return (
            <div style={{display: "inline-block"}}>
                <button
                    className="btn-red"
                    onClick={() => returnBook(ids[0], ids[1])}
                >
                    Zwróć
                </button>

                {/* <ReadButton IdBook={ ids[0] } /> */}
                <button
                    className="btn-blue"
                    onClick={() => readBook(ids[0])}
                >
                    Czytaj
                </button>
            </div>
        )
    else 
    {
        return (
            <button 
                value={ ids } 
                className="btn-orange"
                onClick={() => hireBook(ids[0], ids[1])}
            >
                Wypożycz
            </button>
        )
    }
}

class BookDetails extends Component 
{
    state = {
        Title: '',
        Thumbnail: '',
        Description: '',
        releaseDate: '',
        Pages: 0,
        IsColorful: false,
        Language: 'PL',
        Genre_IdGenre: '',
        Genre: 'unknown',
        Author_IdAuthor: 0,
        Author: {},
        Authorized: false,
        IdUser: 0,
        Hired: false
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        if (getCookie("Token"))
            this.state.Authorized = true;

        const IdUser = getCookie("IdUser");
        if(IdUser){
            this.setState({ IdUser });
        }

        callApi(`book/${id}`)
            .then(res => this.setState({ ...res }))
            .then(() => {
                callApi(`author/${this.state.Author_IdAuthor}`)
                    .then(res => this.setState({ Author: res }))
                    .then(() => {
                        callApi(`genre/${this.state.Genre_IdGenre}`)
                            .then(res => this.setState({ Genre: res.Name }))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

            callApi(`user/${getCookie("IdUser")}/book/${id}`)
                .then(res => this.setState({ Hired: res.Hired }))
                .catch(err => console.log(err));
    }

    render()
    {
        const { IdBook, Title, Thumbnail, Description, Pages, IsColorful, Language, Author, Genre_IdGenre, Genre, Authorized, IdUser, Hired } = this.state;

        return (
            <StyledItem className="box">

                <div className="detailsCrud">
                    <CrudBook 
                        Authorized={Authorized} 
                        IdBook={IdBook} 
                        IdUser={IdUser}
                        Hired={Hired}
                    />
                    <div className="close">
                        <Link to="/">
                            <img src="https://img.icons8.com/nolan/64/000000/delete-sign.png" alt="close" />
                        </Link>
                    </div>
                </div>

                <div className="detailsBox">
                    <img src={Thumbnail} alt={Title} className="thumbnail details-img" />
                    <div className="txt-light">
                        <h1 style={{textAlign: "center"}}>{Title}</h1>
                        <p className="txt-light">{Description}</p>

                        <table className="table-align-left" style={{fontSize: "1.4em"}}>
                            <tbody>
                                <tr>
                                    <th>Język</th>
                                    <td>{Language}</td>
                                </tr>
                                <tr>
                                    <th>Liczba stron</th>
                                    <td>{Pages}</td>
                                </tr>
                                <tr>
                                    <th>Gatunek</th>
                                    <td>{Genre}</td>
                                </tr>                            
                                <tr>
                                    <th>W kolorze</th>
                                    <td>{IsColorful ? 'tak' : 'nie'}</td>
                                </tr>
                            </tbody>
                        </table>

                        <hr />
                        <h2>O autorze:</h2>
                        <table className="table-align-left" style={{fontSize: "1.4em"}}>
                            <tbody>
                                <tr>
                                    <th>Autor</th>
                                    <td>{Author.Firstname} {Author.Surname}</td>
                                </tr>
                                <tr>
                                    <th>Pochodzenie</th>
                                    <td>{Author.Origin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </StyledItem>
        );
    }
}

export default BookDetails;