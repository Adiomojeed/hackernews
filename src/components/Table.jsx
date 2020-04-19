import React, { Component } from "react";

class Table extends Component {
	render() {
		const { result, onDismiss } = this.props;
		return (
			<div className="table">
				{result.map((item) => (
					<React.Fragment>
						<tr key={item.objectID}>
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
						<div className="horizontal-rule"></div>
					</React.Fragment>

					//<div key={item.objectID}>
					//	<span>
					//		<a href={item.url}>{item.title}</a>
					//	</span>
					//	<span>{item.author}</span>
					//	<span>{item.num_comments}...</span>
					//	<span>{item.points}</span>
					//	<span>
					//		<button
					//			onClick={() =>
					//				onDismiss(item.objectID)
					//			}
					//			type="button"
					//		>
					//			Dismiss
					//		</button>
					//	</span>
					//</div>
				))}
			</div>
		);
	}
}

export default Table;
