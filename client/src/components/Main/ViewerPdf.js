import React, { Component } from 'react';
import { ReactPDF } from 'react-pdf'
import { Link } from 'react-router-dom';
import '../../App.scss';
import { callApi, getCookie, sendDelete, sendPost } from '../../Helpers';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "10px",
    width: "fit-content",
    margin: "0 auto"
};

class ViewerPdf extends Component 
{
    state = {
        Doc: ''
    }

    componentDidMount()
    {
        // const { id } = this.props.match.params;

        // callApi(`genres`)
        //     .then(res => this.setState({ genres: res }))
        //     .catch(err => console.log(err));
        // this.setState({IdBook: id});
        this.getDoc(this.state.IdBook);
    }

    getDoc = async (id) => {
        // const response = await fetch(`/book/download/${id}`);
        // console.log(response.body);
        // // this.setState({Doc: response});
        // return response.body

        fetch(`/book/download/${id}`)
            .then((response) => response.blob())
            .then((myBlob) => {
                const fileURL = URL.createObjectURL(myBlob);
  
                return fileURL;
              //   window.open(fileURL);
            })
            .then(result => {
                this.setState({Doc: result})
            })
            .catch(err => err.message);

        // return url;
    }

    render()
    {
        // console.log(this.params);
        // const doc = this.params.Doc;
        // const { Doc, IdBook } = this.state;
        const IdBook = this.props.match.params.id;
        this.setState(IdBook);
        console.log(this.getDoc(IdBook));
        return (
            <div
                style={styles}
                className="dark-text dark-thick-border"
            >
                {/* <ReactPDF
                    file={{ url: this.getDoc(IdBook) }}
                /> */}
            </div>
        );
    }
}

export default ViewerPdf;