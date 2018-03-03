import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import EmployeeSelectField from './EmployeeSelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';
import './EventDialog.css';

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

export default class UpdateEventDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			timeReady: false,
			open: false,
			dialogTitle: '行程資訊',
			labelText: '完成',
			visible: false,
			defaultDate: new Date(2018, 1, 1),
			editable: true,
			id: '',
			startTime: new Date(),
			endTime: new Date(),
			errorTextTitle: '',
			errorTextLocation: '',
			errorTextStart: '',
			errorTextEnd: '',
			title: '',
			location: '',
			note: '',
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
				),
				id: nextProps.id,
				startTime: nextProps.start,
				endTime: nextProps.end,
				title: nextProps.title,
				location: nextProps.location,
				note: nextProps.note,
				timeDisabled: nextProps.allDay,
				isRoutine: nextProps.isRoutine
			});
		}
	}

	componentDidUpdate() {
		if (this.state.ready && this.state.timeReady) {
			var formData = new FormData();
			formData.append('idevents', this.state.id);
			formData.append('title', this.refs.title.getValue());
			formData.append('location', this.refs.location.getValue());
			formData.append(
				'date',
				this.state.defaultDate.toLocaleDateString()
			);
			formData.append('start', this.state.startTime);
			formData.append('end', this.state.endTime);
			formData.append(
				'startTime',
				this.state.startTime.toLocaleString('en-GB')
			);
			formData.append(
				'endTime',
				this.state.endTime.toLocaleString('en-GB')
			);
			formData.append('timeDisabled', this.state.timeDisabled);
			formData.append('isRoutine', this.state.isRoutine);
			formData.append('employees', this.state.employees);
			formData.append('note', this.refs.note.getValue());

			let url = 'http://localhost:5000/update_event';
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

			this.setState({
				ready: false,
				timeReady: false,
				open: false,
				dialogTitle: '行程資訊',
				labelText: '完成',
				visible: false,
				defaultDate: new Date(2018, 1, 1),
				editable: true,
				id: '',
				startTime: new Date(),
				endTime: new Date(),
				errorTextTitle: '',
				errorTextLocation: '',
				errorTextStart: '',
				errorTextEnd: '',
				title: '',
				location: '',
				note: '',
				timeDisabled: false,
				isRoutine: false,
				employees: []
			});

			this.props.close(this.state.defaultDate);
		}
	}

	handleClose = () => {
		this.setState({
			ready: false,
			timeReady: false,
			open: false,
			dialogTitle: '行程資訊',
			labelText: '完成',
			visible: false,
			defaultDate: new Date(2018, 1, 1),
			editable: true,
			id: '',
			startTime: new Date(),
			endTime: new Date(),
			errorTextTitle: '',
			errorTextLocation: '',
			errorTextStart: '',
			errorTextEnd: '',
			title: '',
			location: '',
			note: '',
			timeDisabled: false,
			isRoutine: false,
			employees: []
		});
		this.props.close(this.state.defaultDate);
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
				startTime: null,
				endTime: null,
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
		console.log(this.state.endTime);
	};

	handleEditable = () => {
		this.setState({
			editable: false,
			dialogTitle: '更新行程',
			labelText: '取消',
			visible: true
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
				label={this.state.labelText}
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="送出"
				primary={true}
				onClick={this.handleSubmit}
				style={
					this.state.visible
						? { display: 'inline-block' }
						: { display: 'none' }
				}
			/>
		];

		return (
			<Dialog
				title={this.state.dialogTitle}
				actions={actions}
				modal={true}
				open={this.state.open}
				onRequestClose={this.handleClose}
			>
				<FloatingActionButton
					backgroundColor={'#757575'}
					mini={true}
					className="editButton"
					onClick={this.handleEditable}
				>
					<Create />
				</FloatingActionButton>
				<TextField
					ref="title"
					hintText="行程名稱"
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable}
					defaultValue={this.state.title}
					fullWidth={true}
					errorText={this.state.errorTextTitle}
				/>
				<TextField
					ref="location"
					hintText="地點"
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable}
					defaultValue={this.state.location}
					fullWidth={true}
					errorText={this.state.errorTextLocation}
				/>
				<DatePicker
					hintText="選擇日期"
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable}
					defaultDate={this.state.defaultDate}
					onChange={(undefine, date) => this.handleDate(date)}
				/>
				<Toggle
					label="整日行程"
					style={styles.toggle}
					labelPosition="right"
					labelStyle={{ color: '#000' }}
					disabled={this.state.editable}
					onToggle={(event, isInputChecked) =>
						this.handleTimeDisabledToggle(isInputChecked)
					}
				/>
				<Toggle
					label="例行巡檢"
					style={styles.toggle}
					labelPosition="right"
					labelStyle={{ color: '#000' }}
					disabled={this.state.editable}
					onToggle={(event, isInputChecked) =>
						this.handleIsRoutineToggle(isInputChecked)
					}
				/>
				<TimePicker
					ref="startTime"
					style={styles.timePicker}
					hintText="選擇開始時間"
					value={this.state.startTime}
					minutesStep={10}
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable || this.state.timeDisabled}
					okLabel="確定"
					cancelLabel="取消"
					onChange={(undefine, time) => this.handleStartTime(time)}
					errorText={this.state.errorTextStart}
				/>
				<TimePicker
					ref="endTime"
					style={styles.timePicker}
					hintText="選擇結束時間"
					value={this.state.endTime}
					minutesStep={10}
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable || this.state.timeDisabled}
					okLabel="確定"
					cancelLabel="取消"
					onChange={(undefine, time) => this.handleEndTime(time)}
					errorText={this.state.errorTextEnd}
				/>
				<EmployeeSelectField
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable}
					employees={this.getEmployees}
				/>
				<TextField
					ref="note"
					hintText="備註"
					inputStyle={{ color: '#000' }}
					disabled={this.state.editable}
					defaultValue={this.state.note}
					fullWidth={true}
				/>
			</Dialog>
		);
	}
}
