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

class App extends Component
{
	state = {
		response: '',
		post: '',
		responseToPost: '',
	};
	componentDidMount()
	{
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
	}
	callApi = async () =>
	{
		const response = await fetch('/api/hello');
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
		return (
			<Router>
				<div>

					<header className="App-header">
						<div className="container d-flex flex-in-row">
							<h1 className="logo">
								<Link to="/">Ebookator</Link>
							</h1>

							<GuestPanel />
						</div>
					</header>

					<div className="container">
						<BookItem title={"The lord of the rings"} />
						<Switch>
							<Route exact path="/" component={Main} />
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