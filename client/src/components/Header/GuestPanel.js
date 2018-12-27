import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './HeaderStyles.scss';

const styles = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
};

class GuestPanel extends Component 
{
    state = {

    }

    render()
    {
        return (
            <div
                style={styles}
            >
                <button className="btn-light"><Link to="/login">Zaloguj</Link></button>
                <button className="btn-light"><Link to="/register">Zarejestruj</Link></button>
            </div>
        );
    }
}

export default GuestPanel;