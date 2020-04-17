import React, { Component } from "react";

class Table extends Component {
	render() {
		const { result, onDismiss, searchTerm } = this.props;
		return (
			<div>
				{result
					.filter((x) =>
						x.title.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.map((item) => (
						<div key={item.objectID}>
							<span>
								<a href={item.url}>{item.title}</a>
							</span>
							<span>{item.author}</span>
							<span>{item.num_comments}</span>
							<span>{item.points}</span>
							<span>
								<button
									onClick={() =>
										onDismiss(item.objectID)
									}
									type="button"
								>
									Dismiss
								</button>
							</span>
						</div>
					))}
			</div>
		);
	}
}

export default Table;
