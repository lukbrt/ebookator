import React, { Component } from 'react';
import '../../App.scss';
import { callApi, sendPost, sendDelete, getCookie } from '../../Helpers';
import { Link, Redirect } from 'react-router-dom';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "10px",
    width: "fit-content",
    margin: "0 auto"
};

class ReadButton extends Component 
{
    state = {
        Doc: ''
    }

    render()
    {
        const { IdBook } = this.props;
        console.log(IdBook);
        return (
            <button
                className="btn-blue"
                // onClick={(IdBook) => this.getDoc(IdBook)}
            >
                <Link to={`/readBook/${IdBook}`}>Czytaj</Link>
                {/* params={{ Doc: this.state.Doc }} */}
            </button>
        );
    }
}

export default ReadButton;