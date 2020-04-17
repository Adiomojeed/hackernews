import React, { Component } from "react";
import ReactDOM from "react-dom";
import HackerNews from "./components/HackerNews";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div>
				<HackerNews />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));
