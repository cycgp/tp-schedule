import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import './Calendar.css';
import AddEventDialog from './AddEventDialog';

const StyledDiv = styled.div`
	height: 800px;
	padding: 25px;
`;
require('moment/locale/zh-tw');
moment.locale('zh-tw');
BigCalendar.momentLocalizer(moment);

const messages = {
	allDay: '整日活動',
	previous: '<',
	next: '>',
	today: '今日',
	month: '月',
	week: '週',
	day: '日',
	agenda: '行程表',
	date: '日期',
	time: '時間',
	event: '活動',
	showMore: total => `還有 ${total} 項...`
};

const formats = {
	timeGutterFormat: 'HH:mm',
	dayRangeHeaderFormat: ({ start, end }, culture, local) =>
		local.format(start, 'M月DD日', culture) +
		' - ' +
		local.format(end, 'M月DD日', culture),
	eventTimeRangeFormat: ({ start, end }, culture, local) =>
		local.format(start, 'HH:mm', culture) +
		' - ' +
		local.format(end, 'HH:mm', culture),
	monthHeaderFormat: 'YYYY年M月',
	dayFormat: 'MM/DD 星期dd',
	dateFormat: 'D日',
	dayHeaderFormat: '星期dd M月DD日',
	agendaTimeRangeFormat: ({ start, end }, culture, local) =>
		local.format(start, 'HH:mm', culture) +
		'-' +
		local.format(end, 'HH:mm', culture),
	agendaDateFormat: 'MM/DD 星期dd'
};

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			navigateDate: new Date(),
			events: [],
			addEventDialog: false,
			addEventYear: 0,
			addEventMonth: 0,
			addEventDate: 0
		};
	}

	componentDidMount() {
		this.handleNavigate(new Date(2015, 3, 12));
		var From_date = new Date();
		var To_date = new Date();

		From_date.setMonth(From_date.getMonth() - 1);
		To_date.setMonth(To_date.getMonth() + 1);

		var formData = new FormData();
		formData.append('From_date', From_date.toLocaleDateString());
		formData.append('To_date', To_date.toLocaleDateString());

		let url = 'http://localhost:5000/get_event';
		let init = {
			method: 'POST',
			body: formData
		};
		fetch(url, init)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({
					events: json
				});
			})
			.catch(function(err) {
				console.log('Fetch Error :', err);
			});
	}

	handleOnSelectSlot = slotInfo => {
		var slotYear = new Date(slotInfo.slots).getFullYear();
		var slotMonth = new Date(slotInfo.slots).getMonth();
		var slotDate = new Date(slotInfo.slots).getDate();
		this.setState({
			addEventDialog: true,
			addEventYear: slotYear,
			addEventMonth: slotMonth,
			addEventDate: slotDate
		});
	};

	handleNavigate = date => {
		console.log(this.state.events);
		this.setState({
			navigateDate: date
		});
	};

	render() {
		return (
			<StyledDiv>
				<BigCalendar
					selectable
					formats={formats}
					timeslots={2}
					step={60}
					messages={messages}
					events={this.state.events}
					defaultView="month"
					scrollToTime={new Date(1970, 1, 1, 6)}
					defaultDate={new Date(2015, 3, 12)}
					onNavigate={date => this.handleNavigate(date)}
					onSelectEvent={event => alert(event.id)}
					onSelectSlot={slotInfo => this.handleOnSelectSlot(slotInfo)}
				/>
				<AddEventDialog
					open={this.state.addEventDialog}
					year={this.state.addEventYear}
					month={this.state.addEventMonth}
					date={this.state.addEventDate}
				/>
			</StyledDiv>
		);
	}
}

export default Calendar;
