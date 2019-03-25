import React, { Component } from 'react';
import '../../App.scss';

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
};

const formStyles = {
    display: "flex",
    flexDirection: "column"
}

class Main extends Component 
{
    state = {

    }

    render()
    {
        return (
            <main>
                <h1>Lorem ipsusm home page</h1>
                {/* <div className="container">
                    <p>{this.state.response}</p>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <strong>Post to Server:</strong>
                        </p>
                        <input
                            type="text"
                            value={this.state.post}
                            onChange={e => this.setState({ post: e.target.value })}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <p>{this.state.responseToPost}</p>
                </div> */}

            </main>
        );
    }
}

export default Main;