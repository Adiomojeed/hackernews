import React, { Component } from 'react'

class Search extends Component {
    render() {
        const {searchTerm, onHandleChange, onHandleSearch} = this.props
        return (
            <div>
                <form onSubmit={onHandleSearch}>
					<input
						type="text"
						value={searchTerm}
						onChange={onHandleChange}
					/>
                    <button type="submit">Search</button>
				</form>
            </div>
        )
    }
}

export default Search
