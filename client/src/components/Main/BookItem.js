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

class BookItem extends Component 
{
    state = {

    }

    render()
    {
        const {title} = this.props;

        return (
            <StyledItem className="box">
                <img src="" alt="" className="thumbnail" />
                <div>
                    <h3>{title}</h3>
                    <button className="btn-light">Szczegóły</button>
                </div>
            </StyledItem>
        );
    }
}

export default BookItem;