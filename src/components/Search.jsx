import React, { Component } from 'react'

class Search extends Component {
    render() {
        const {value, onSearchChange} = this.props
        return (
            <div>
                <form>
					<input type="text" value={value} onChange={onSearchChange} />
				</form>
            </div>
        )
    }
}

export default Search
