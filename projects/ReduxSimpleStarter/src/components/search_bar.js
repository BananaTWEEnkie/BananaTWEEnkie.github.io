import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: ''};
	}

	render() { // every class needs this render
		// controlled component when value is set by state
		return (
			<div>
				<input
					value={this.state.term}
					onChange={event => this.setState({ term: event.target.value })} />
			</div>
		);
	}
}

export default SearchBar;