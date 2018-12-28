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
        Language: 'PL'
    }

    componentDidMount()
	{
        const { id } = this.props.match.params;

		callApi(`book/${id}`)
			.then(res => this.setState({ ...res }))
			.catch(err => console.log(err));
    }

    render()
    {
        const { Title, Thumbnail, Description, Pages, IsColorful, Language } = this.state;

        return (
            <StyledItem className="box">
                <div className="close">
                    <Link to="/">
                        <img src="https://img.icons8.com/nolan/64/000000/delete-sign.png" />
                    </Link>
                </div>

                <img src={Thumbnail} alt={Title} className="thumbnail details-img" />
                <div>
                    <h3>{Title}</h3>
                    <p>{Description}</p>
                    <button className="btn-orange">Wypożycz</button>
                </div>
            </StyledItem>
        );
    }
}

export default BookDetails;