import React, { Component } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import Table from "./Table";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

class HackerNews extends Component {
	constructor(props) {
		super(props);

		this.state = {
			result: null,
			searchTerm: DEFAULT_QUERY,
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
			.then((response) => response.json())
			.then((result) => this.setState({ result: result.hits }))
			.catch((error) => error);
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	onDismiss(id) {
		const isNotId = (item) => item.objectID !== id;
		const updatedHits = this.state.result.filter(isNotId);
		this.setState({ result: updatedHits });
	}

	render() {
		const { result, searchTerm } = this.state;
		const override = css`
			display: block;
			margin: 10px auto;
			border-color: red;
		`;

		return (
			<div className="App">
				<form>
					<input
						type="text"
						value={searchTerm}
						onChange={this.onSearchChange}
					/>
				</form>
				{result ? (
					<Table
						result={result}
						searchTerm={searchTerm}
						onDismiss={this.onDismiss}
					/>
				) : (
					<BounceLoader css={override} size={80} color={"#123abc"} />
				)}
			</div>
		);
	}
}

export default HackerNews;
