import React, { Component } from 'react';
import BookItem from './BookItem';
import styled from 'styled-components'
import '../../App.scss';

const StyledGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

class BookItems extends Component 
{
    state = {

    }

    render()
    {
        const { books } = this.props;

        return (
            <div>
                <h1>Najnowsze pozycje:</h1>
                <StyledGrid>
                    {
                        books.map(currentBook => 
                            <BookItem
                                key={currentBook.IdBook}
                                book={currentBook} 
                        />
                    )}
                </StyledGrid>
            </div>
        );
    }
}

export default BookItems;