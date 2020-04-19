import React, { Component } from "react";

class Search extends Component {
	render() {
		const { searchTerm, onHandleChange, onHandleSearch } = this.props;
		return (
			<form onSubmit={onHandleSearch}>
				<div className="form-group">
					<input
						type="text"
						value={searchTerm}
						className="form-control"
						onChange={onHandleChange}
						list="languages"
					/>
					<datalist id="languages">
						<option value="react">react</option>
						<option value="redux">javascript</option>
						<option value="javascript">javascript</option>
						<option value="html">html</option>
						<option value="css">css</option>
						<option value="php">php</option>
						<option value="nuxt">nuxt</option>
						<option value="database">database</option>
						<option value="bootstrap">bootstrap</option>
						<option value="framework">framework</option>
					</datalist>
					<button
						type="submit"
						className="btn--action fas fa-search"
					></button>
				</div>
			</form>
		);
	}
}

export default Search;
