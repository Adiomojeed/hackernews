import React, { Component } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import axios from 'axios'
import Table from "./Table";
import Search from "./Search";

const DEFAULT_QUERY = "react";
const PATH = "https://hn.algolia.com/api/v1/search?query=";
const PARAM_PAGE = "page="

class HackerNews extends Component {
	constructor(props) {
		super(props);

		this.state = {
			result: null,
			searchTerm: DEFAULT_QUERY,
			page: 0,
		};

		this.setStory = this.setStory.bind(this);
		this.fetchTopstories = this.fetchTopstories.bind(this);
		this.HandleSearch = this.HandleSearch.bind(this);
		this.HandleChange = this.HandleChange.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
	}

	setStory(result) {
		this.setState({ result: result });
	}
	fetchTopstories(searchTerm, page) {
		axios(`${PATH}${searchTerm}&${PARAM_PAGE}${page}`)
			.then((result) => this.setStory(result.data.hits))
			.catch((error) => error);
	}
	componentDidMount() {
		const { searchTerm, page } = this.state;
		this.fetchTopstories(searchTerm, page);
	}
	handleNext () {
		const {searchTerm, page} = this.state
		this.fetchTopstories(searchTerm, page+1)
		this.setState({page: page+1})
	}
	handlePrev () {
		const {searchTerm, page} = this.state
		const newPage = page === 0 ? 0 : page-1
		this.fetchTopstories(searchTerm, newPage)
		this.setState({page: newPage})
	}

	HandleChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	HandleSearch(e) {
		const { searchTerm } = this.state;
		this.fetchTopstories(searchTerm, 0);
		e.preventDefault();
	}

	onDismiss(id) {
		const isNotId = (item) => item.objectID !== id;
		const updatedHits = this.state.result.filter(isNotId);
		this.setState({ result: updatedHits });
	}


	render() {
		const { result, searchTerm, error } = this.state;
		const override = css`
			display: block;
			margin: 10px auto;
			border-color: red;
		`;

		if (!result) {
			return <BounceLoader css={override} size={80} color={"#123abc"} />;
		}

		return (
			<div className="App">
				<Search
					searchTerm={searchTerm}
					onHandleChange={this.HandleChange}
					onHandleSearch={this.HandleSearch}
				/>
				{!result ? (
					<React.Fragment>
						<BounceLoader css={override} size={80} color={"#123abc"} />
						<h1>error</h1>
					</React.Fragment>
				) : (
					<Table
						result={result}
						searchTerm={searchTerm}
						onDismiss={this.onDismiss}
					/>
				)}
				<button type='button' onClick={this.handlePrev}>
					Previous
				</button>
				<button type='button' onClick={this.handleNext}>
					Next
				</button>
			</div>
		);
	}
}

export default HackerNews;
