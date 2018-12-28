import React, { Component } from 'react';
import styled from 'styled-components'
import '../../App.scss';
import { Link } from 'react-router-dom';

const StyledItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5px 10px;
    margin: 10px;
    width: fit-content;
    text-align: center;
`;

class BookItem extends Component 
{
    state = {

    }

    render()
    {
        const { book } = this.props;

        return (
            <StyledItem className="box">
                <img src={book.Thumbnail} alt="" className="thumbnail" />
                <div>
                    <h3>{book.Title}</h3>
                    <button className="btn-light">
                        <Link to={`/book/${book.IdBook}`}>
                            Szczegóły
                        </Link>
                    </button>
                </div>
            </StyledItem>
        );
    }
}

export default BookItem;