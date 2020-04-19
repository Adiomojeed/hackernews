import React, { Component } from "react";
import ReactDOM from "react-dom";
import HackerNews from "./components/HackerNews";
import "./styles/app.scss";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<HackerNews />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));
