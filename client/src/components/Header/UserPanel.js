
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './HeaderStyles.scss';
import { getCookie, deleteCookie } from '../../Helpers';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

class UserPanel extends Component 
{
    state = {

    }

    logOut = () => {
        deleteCookie("Token");
        deleteCookie("Login");
        deleteCookie("IdUser");
        window.location.reload();
    }

    render()
    {
        return (
            <div
                style={styles}
            >
                <div 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    fontSize: ".6em",
                    flexDirection: "column",
                    lineHeight: "1.4em",
                    marginRight: "10px"
                }}
                >
                    <Link to="/bookAdd">Dodaj książkę</Link>
                    <Link to="/genre/add">Dodaj gatunek</Link>
                    <Link to="/author/add">Dodaj autora</Link>
                </div>
                <div style={styles}>
                    <img src="https://img.icons8.com/color/48/000000/reading.png" alt="reading person" />
                    <span>Witaj, {getCookie("Login")}</span>
                </div>
                <button className="btn-light" onClick={this.logOut}><Link to={'/'}>Wyloguj się</Link></button>
            </div>
        );
    }
}

export default UserPanel;