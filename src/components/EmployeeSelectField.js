import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const names = [
	'黃雅慧',
	'陳一凡',
	'梁弘恬',
	'賴鈺婷',
	'林世淳',
	'吳宏儒',
	'黃鈺彥',
	'韓延依',
	'吳美民',
	'朱思婷',
	'劉和綺',
	'劉玫人'
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
export default class EmployeeSelectField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: []
		};
	}

	handleChange = (event, index, values) => {
		this.setState({ values });
		this.props.employees(values);
	};

	menuItems(values) {
		return names.map(name => (
			<MenuItem
				key={name}
				insetChildren={true}
				checked={values && values.indexOf(name) > -1}
				value={name}
				primaryText={name}
			/>
		));
	}

	render() {
		const { values } = this.state;
		return (
			<SelectField
				multiple={true}
				hintText="選擇員工"
				fullWidth={true}
				value={values}
				onChange={this.handleChange}
			>
				{this.menuItems(values)}
			</SelectField>
		);
	}
}
