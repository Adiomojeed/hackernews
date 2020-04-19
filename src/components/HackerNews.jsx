import React, { Component } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import axios from "axios";
import Table from "./Table";
import Search from "./Search";

const DEFAULT_QUERY = "react";
const PATH = "https://hn.algolia.com/api/v1/search?query=";
const PARAM_PAGE = "page=";

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
		this.handleNext = this.handleNext.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
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
	handleNext() {
		const { searchTerm, page } = this.state;
		this.fetchTopstories(searchTerm, page + 1);
		this.setState({ page: page + 1 });
		window.scrollTo(0, 0);
	}
	handlePrev() {
		const { searchTerm, page } = this.state;
		const newPage = page === 0 ? 0 : page - 1;
		this.fetchTopstories(searchTerm, newPage);
		this.setState({ page: newPage });
		window.scrollTo(0, 0);
	}

	HandleChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	HandleSearch(e) {
		const { searchTerm } = this.state;
		this.setState({result: null})
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
			margin: 20px auto;
			text-align: center;
			border-color: #55efc4;
			color: #55efc4;
			max-width: 100%
		`;
		return (
			<div className="col">
				<h1 className="hero-text">Hacker News</h1>
				<Search
					searchTerm={searchTerm}
					onHandleChange={this.HandleChange}
					onHandleSearch={this.HandleSearch}
				/>
				{!result ? (
					
						<BounceLoader css={override} size={80} color={"#55efc4"} />
					
				) : (
					<React.Fragment>
						<h2>Search Results...</h2>
						<table>
							<Table
								result={result}
								searchTerm={searchTerm}
								onDismiss={this.onDismiss}
							/>
						</table>
					</React.Fragment>
				)}
				<div className="footer">
					<button
						type="button"
						onClick={this.handlePrev}
						className="pagination"
					>
						<i className="fas fa-long-arrow-alt-left"></i>
					</button>
					<button
						type="button"
						onClick={this.handleNext}
						className="pagination"
					>
						<i className="fas fa-long-arrow-alt-right"></i>
					</button>
				</div>
				<footer>
					<i className="fas fa-code"></i> with{" "}
					<i className="fas fa-heart"></i> by codeLeaf&#128640;
				</footer>
			</div>
		);
	}
}

export default HackerNews;
