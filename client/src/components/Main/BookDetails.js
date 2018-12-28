import React, { Component } from 'react';
import styled from 'styled-components'
import '../../App.scss';
import { callApi } from '../../Helpers';
import { Link } from 'react-router-dom';

const StyledItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 2.5%;
    margin: 10px;
    width: fit-content;
`;

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
        Author_IdAuthor: 0,
        Author: {}
    }

    componentDidMount()
    {
        const { id } = this.props.match.params;

        callApi(`book/${id}`)
            .then(res => this.setState({ ...res }))
            .then(() => {
                callApi(`author/${this.state.Author_IdAuthor}`)
                    .then(res => this.setState({ Author: res }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render()
    {
        const { Title, Thumbnail, Description, Pages, IsColorful, Language, Author } = this.state;

        return (
            <StyledItem className="box">
                <div className="close">
                    <Link to="/">
                        <img src="https://img.icons8.com/nolan/64/000000/delete-sign.png" />
                    </Link>
                </div>

                <img src={Thumbnail} alt={Title} className="thumbnail details-img" />
                <div className="txt-light">
                    <h1 style={{textAlign: "center"}}>{Title}</h1>
                    <p className="txt-light">{Description}</p>

                    <table style={{fontSize: "1.4em"}}>
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
                                <th>W kolorze</th>
                                <td>{IsColorful ? 'tak' : 'nie'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="btn-orange">Wypożycz</button>
                    <hr />
                    <h2>O autorze:</h2>
                    <table style={{fontSize: "1.4em"}}>
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
            </StyledItem>
        );
    }
}

export default BookDetails;