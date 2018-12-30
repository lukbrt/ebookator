import React, { Component } from 'react';
import
{
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
import GuestPanel from './components/Header/GuestPanel';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Main from './components/Main/Main';
import BookItem from './components/Main/BookItem';
import BookItems from './components/Main/BookItems';
import BookDetails from './components/Main/BookDetails';
import UserPanel from './components/Header/UserPanel';
import { getCookie } from './Helpers';

function RenderUserPanel() {
	if (getCookie("Token"))
		return <UserPanel />;
	else
		return <GuestPanel />;
}

class App extends Component
{
	state = {
		books: [],
		categories: [],
		response: '',
		post: '',
		responseToPost: '',
	};
	componentDidMount()
	{
		this.callApi('books')
			.then(res => this.setState({ books: res }))
			.catch(err => console.log(err));
	}
	callApi = async (path) =>
	{
		const response = await fetch(`/${path}`);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};
	handleSubmit = async e =>
	{
		e.preventDefault();
		const response = await fetch('/api/world', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ post: this.state.post }),
		});
		const body = await response.text();
		this.setState({ responseToPost: body });
	};


	render()
	{
		const flex = {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			minHeight: "100vh"
		};

		return (
			<Router>
				<div style={flex}>

					<header className="App-header">
						<div className="container d-flex flex-in-row">
							<h1 className="logo">
								<Link to="/">Ebookator</Link>
							</h1>
							<Switch>
								<Route	path="/" component={RenderUserPanel} />
							</Switch>
							{/* <RenderUserPanel /> */}
						</div>
					</header>

					<div className="container">
						{/* <BookItems books={this.state.books} /> */}
						<Switch>
							<Route exact path="/"
								component={() => <BookItems books={this.state.books} />}
							/>
							<Route path="/book/:id"
								component={BookDetails}
							/>
							<Route path="/login" component={LogIn} />
							<Route path="/register" component={Register} />
						</Switch>
					</div>

					<footer
						style={{
							borderTop: "3px solid darkgray",
							backgroundColor: "lightgray",
							padding: "5px"
						}}
					>
						<div className="container">
							<p>Copyright &copy; {(new Date()).getFullYear()} by Łukasz Bartoś</p>
						</div>
					</footer>
				</div>
			</Router>
		);
	}
}
export default App;