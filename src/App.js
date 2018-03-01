import React, { Component } from 'react';
import Calendar from './components/Calendar';
import EmployeeList from './components/EmployeeList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Schedule from 'material-ui/svg-icons/action/schedule';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'a'
		};
	}

	handleChange = value => {
		this.setState({
			value: value
		});
	};

	render() {
		return (
			<div className="App">
				<MuiThemeProvider>
					<Tabs value={this.state.value} onChange={this.handleChange}>
						<Tab icon={<Schedule />} label="行事曆" value="a">
							<Calendar />
						</Tab>
						<Tab
							icon={<MapsPersonPin />}
							label="員工清單"
							value="b"
						>
							<div>
								<EmployeeList />
							</div>
						</Tab>
					</Tabs>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default App;
