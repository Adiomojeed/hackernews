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
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			results: null,
			searchTerm: DEFAULT_QUERY,
			searchKey: "",
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
		const { searchKey, results } = this.state;
		const { hits, page } = result;
		this.setState({
			results: {
				...results,
				[searchKey]: { hits, page },
			},
		});
	}
	fetchTopstories(searchTerm, page) {
		axios(`${PATH}${searchTerm}&${PARAM_PAGE}${page}`)
			.then((result) => {
				if (this._isMounted) {
					this.setStory(result.data);
				}
			})
			.catch((error) => error);
	}
	componentDidMount() {
		this._isMounted = true;
		const { searchTerm, page, result, searchKey } = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchTopstories(searchTerm, page);
	}

	componentDidUpdate () {
		console.log(this.state.results)
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleNext() {
		const { searchTerm, page, results } = this.state;
		this.setState({ searchKey: searchTerm, results: { ...results }, page: page + 1 });
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
		const { searchTerm, results } = this.state;
		this.setState({ searchKey: searchTerm, results: { ...results } });
		this.fetchTopstories(searchTerm, 0);
		e.preventDefault();
	}

	onDismiss(id) {
		const {searchKey, results} = this.state
		const isNotId = (item) => item.objectID !== id;
		const updatedHits = results[searchKey]['hits'].filter(isNotId);
		console.log(updatedHits)
		this.setState({ results: {
			...results,
			[searchKey]: {hits: updatedHits, page: [searchKey].page}
		} });
	}

	render() {
		const { results, searchTerm, error, searchKey } = this.state;
		const actualResult =
			(results && results[searchKey] && results[searchKey]["hits"]) || [];
		const override = css`
			display: block;
			margin: 20px auto;
			text-align: center;
			border-color: #55efc4;
			color: #55efc4;
			max-width: 100%;
		`;
		return (
			<div className="col">
				<h1 className="hero-text">Hacker News</h1>
				<Search
					searchTerm={searchTerm}
					onHandleChange={this.HandleChange}
					onHandleSearch={this.HandleSearch}
				/>
				{!results ? (
					<BounceLoader css={override} size={80} color={"#55efc4"} />
				) : (
					<React.Fragment>
						<h2>Search Results...</h2>
						<table>
							<Table
								result={actualResult}
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
