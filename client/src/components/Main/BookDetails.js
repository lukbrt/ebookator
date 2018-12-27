import React, { Component } from 'react';
import styled from 'styled-components'
import '../../App.scss';

const StyledItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5px 10px;
    margin: 10px;
    width: fit-content;
`;

class BookDetails extends Component 
{
    state = {
        title: '',
        avatar: '',
        description: '',
        releaseDate: '',
        pages: 0,
        isColor: false,
        language: 'PL'
    }

    render()
    {
        const {title} = this.props;

        return (
            <StyledItem className="box">
                <img src="" alt="" className="thumbnail" />
                <div>
                    <h3>{title}</h3>
                    <button className="btn-orange">Wypożycz</button>
                </div>
            </StyledItem>
        );
    }
}

export default BookDetails;