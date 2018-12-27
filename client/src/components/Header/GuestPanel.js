import React, { Component } from 'react';
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
                <button className="btn-light">Zaloguj</button>
                <button className="btn-light">Zarejestruj</button>
            </div>
        );
    }
}

export default GuestPanel;