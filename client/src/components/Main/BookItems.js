import React, { Component } from 'react';
import BookItem from './BookItem';
import styled from 'styled-components'
import '../../App.scss';
import { callApi } from '../../Helpers';

const StyledGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

class BookItems extends Component 
{
    state = {
        books: []
    }

    componentDidMount()
	{
		callApi('books')
			.then(res => this.setState({ books: res }))
			.catch(err => console.log(err));
	}

    render()
    {
        const { books } = this.state;

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