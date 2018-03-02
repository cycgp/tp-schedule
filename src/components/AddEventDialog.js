import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import EmployeeSelectField from './EmployeeSelectField';

const styles = {
	toggle: {
		marginTop: 8,
		marginBottom: 16,
		width: '50%',
		display: 'inline-block'
	},
	timePicker: {
		width: '50%',
		display: 'inline-block',
		verticalAlign: 'top'
	}
};

export default class AddEventDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			timeReady: false,
			open: false,
			defaultDate: new Date(2018, 1, 1),
			startTime: '',
			endTime: '',
			errorTextTitle: '',
			errorTextLocation: '',
			errorTextStart: '',
			errorTextEnd: '',
			timeDisabled: false,
			isRoutine: false,
			employees: []
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.open === true) {
			this.setState({
				open: true,
				defaultDate: new Date(
					nextProps.year,
					nextProps.month,
					nextProps.date
				)
			});
		}
	}

	componentDidUpdate() {
		if (this.state.ready && this.state.timeReady) {
			var formData = new FormData();
			formData.append('title', this.refs.title.getValue());
			formData.append('location', this.refs.location.getValue());
			formData.append(
				'date',
				this.state.defaultDate.toLocaleDateString()
			);
			formData.append('startTime', this.state.startTime);
			formData.append('endTime', this.state.endTime);
			formData.append('timeDisabled', this.state.timeDisabled);
			formData.append('isRoutine', this.state.isRoutine);
			formData.append('employees', this.state.employees);
			formData.append('note', this.refs.note.getValue());

			let url = 'http://localhost:5000/add_event';
			let init = {
				method: 'POST',
				headers: {
					'cache-control': 'no-cache'
				},
				mode: 'no-cors',
				body: formData
			};

			fetch(url, init)
				.then(response => response.blob())
				.catch(function(err) {
					console.log('Fetch Error :-S', err);
				});
		}
	}

	handleClose = () => {
		this.setState({
			ready: false,
			timeReady: false,
			open: false,
			defaultDate: new Date(2018, 1, 1),
			startTime: '',
			endTime: '',
			errorTextTitle: '',
			errorTextLocation: '',
			errorTextStart: '',
			errorTextEnd: '',
			timeDisabled: false,
			isRoutine: false,
			employees: []
		});
	};

	handleSubmit = () => {
		const errorText = '此欄位為必填';
		var title = this.refs.title.getValue();
		var location = this.refs.location.getValue();
		var startTime = this.state.startTime;
		var endTime = this.state.endTime;
		var timeDisabled = this.state.timeDisabled;

		if (timeDisabled) {
			this.setState({
				timeReady: true,
				errorTextStart: '',
				errorTextEnd: ''
			});
		} else {
			if (startTime === '') {
				this.setState({
					timeReady: false,
					errorTextStart: errorText
				});
			} else {
				this.setState({
					timeReady: true,
					errorTextStart: null
				});
			}
			if (endTime === '') {
				this.setState({
					timeReady: false,
					errorTextEnd: errorText
				});
			} else {
				this.setState({
					timeReady: true,
					errorTextEnd: null
				});
			}
		}
		if (title === '') {
			this.setState({
				ready: false,
				errorTextTitle: errorText
			});
		} else {
			this.setState({
				ready: true,
				errorTextTitle: null
			});
		}
		if (location === '') {
			this.setState({
				ready: false,
				errorTextLocation: errorText
			});
		} else {
			this.setState({
				ready: true,
				errorTextLocation: null
			});
		}
	};

	handleDate = date => {
		this.setState({
			defaultDate: date
		});
	};
	handleTimeDisabledToggle = isInputChecked => {
		if (isInputChecked) {
			this.setState({
				timeDisabled: true,
				ready: false
			});
		} else {
			this.setState({
				timeDisabled: false,
				ready: false
			});
		}
	};

	handleIsRoutineToggle = isInputChecked => {
		if (isInputChecked) {
			this.setState({
				isRoutine: true
			});
		} else {
			this.setState({
				isRoutine: false
			});
		}
	};

	handleStartTime = time => {
		this.setState({
			startTime: time
		});
	};

	handleEndTime = time => {
		this.setState({
			endTime: time
		});
	};

	getEmployees = val => {
		this.setState({
			employees: val
		});
	};
	render() {
		const actions = [
			<FlatButton
				label="取消"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="送出"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleSubmit}
			/>
		];

		return (
			<Dialog
				title="建立新行程"
				actions={actions}
				modal={true}
				open={this.state.open}
				onRequestClose={this.handleClose}
			>
				<TextField
					ref="title"
					hintText="行程名稱"
					fullWidth={true}
					errorText={this.state.errorTextTitle}
				/>
				<TextField
					ref="location"
					hintText="地點"
					fullWidth={true}
					errorText={this.state.errorTextLocation}
				/>
				<DatePicker
					hintText="選擇日期"
					defaultDate={this.state.defaultDate}
					onChange={(undefine, date) => this.handleDate(date)}
				/>
				<Toggle
					label="整日行程"
					style={styles.toggle}
					labelPosition="right"
					onToggle={(event, isInputChecked) =>
						this.handleTimeDisabledToggle(isInputChecked)
					}
				/>
				<Toggle
					label="例行巡檢"
					style={styles.toggle}
					labelPosition="right"
					onToggle={(event, isInputChecked) =>
						this.handleIsRoutineToggle(isInputChecked)
					}
				/>
				<TimePicker
					ref="startTime"
					style={styles.timePicker}
					hintText="選擇開始時間"
					minutesStep={10}
					onChange={(undefine, time) => this.handleStartTime(time)}
					errorText={this.state.errorTextStart}
					disabled={this.state.timeDisabled}
				/>
				<TimePicker
					ref="endTime"
					style={styles.timePicker}
					hintText="選擇結束時間"
					minutesStep={10}
					onChange={(undefine, time) => this.handleEndTime(time)}
					errorText={this.state.errorTextEnd}
					disabled={this.state.timeDisabled}
				/>
				<EmployeeSelectField employees={this.getEmployees} />
				<TextField ref="note" hintText="備註" fullWidth={true} />
			</Dialog>
		);
	}
}
