import React, { Component } from "react";

class Table extends Component {
	render() {
		const { result, onDismiss } = this.props;
		return (
			<div className="table">
				{result.map((item) => (
					<React.Fragment key={item.objectID}>
						<tr>
							<td className="news__details">
								<div className="article--title">
									<a href={item.url}>{item.title}</a>
								</div>
								<div className="article--details">
									<span className="article__info">
										<i className="fas fa-user-tie"></i>{" "}
										{item.author.toUpperCase()}
									</span>
									<span className="article__info">
										<i className="fas fa-comments"></i>{" "}
										{item.num_comments}
									</span>
									<span className="article__info">
										<i className="fas fa-layer-group"></i>{" "}
										{item.points}
									</span>
								</div>
							</td>
							<td>
								<button
									className="btn--remove"
									onClick={() => onDismiss(item.objectID)}
									type="button"
								>
									<i className="fas fa-trash-alt"></i>
								</button>
							</td>
						</tr>
						<span className="horizontal-rule"></span>
					</React.Fragment>
				))}
			</div>
		);
	}
}

export default Table;
